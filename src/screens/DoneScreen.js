import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
//Components
import Title from '../components/Title';
import NoContent from '../components/NoContent';
import {AppContext} from '../context/AppContext';
import AccordionItem from '../components/AccordionItem';
import {Colors} from '../styles';
import Divider from '../components/Divider';
import {WorkerContext} from '../context/WorkerContext';
import {AuthContext} from '../context/AuthContext';

const DoneScreen = () => {
  const {
    locale: {locale},
  } = useContext(AppContext);
  const {userType} = useContext(AuthContext);

  const {dropList, getDropList, setItemDrop} = useContext(WorkerContext);

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [dropButtonLoading, setDropButtonLoading] = useState(null);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await getDropList();
      setRefreshing(false);
    } catch (e) {
      console.log(e);
      setRefreshing(false);
    }
  };

  const onMount = async () => {
    setLoading(true);
    await getDropList();
    setLoading(false);
  };

  useEffect(() => {
    onMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDropToBin = async (id, index) => {
    setDropButtonLoading(index);
    try {
      await setItemDrop(id).then(async () => {
        await getDropList();
      });
    } catch {}
    setDropButtonLoading(null);
  };
  const statusCheckKey =
    userType === 'fisher' ? 'fishmongering_completed' : 'butchering_completed';
  const getPackedItemCount = list => {
    if (list && list.length !== 0) {
      return list.filter(itm => itm[statusCheckKey]).length;
    } else {
      return 0;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Title text={locale?.headings.done} />
      <FlatList
        data={dropList}
        ListEmptyComponent={() => (
          <NoContent name="NoOrdersSVG" isLoading={isLoading} />
        )}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${index}${item.id}`}
        ItemSeparatorComponent={() => <Divider />}
        onRefresh={onRefresh}
        refreshing={refreshing}
        renderItem={({item, index}) => {
          const readyItems = getPackedItemCount(item?.items);
          const completed = readyItems === item?.items?.length;
          return (
            <AccordionItem
              order={item}
              index={index}
              orderType={item?.order_type ? item.order_type : locale?.status.SD}
              status={completed ? locale?.status?.cc : locale?.status?.cn}
              itemCount={
                readyItems + '/' + item?.items?.length + ' ' + locale?.done
              }
              onReadyPress={onDropToBin}
              buttonTitle={locale.DS_dropReady}
              showReadyButton={completed}
              readyButtonLoading={dropButtonLoading}
              locale={locale}
              userType={'fisher'}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: Colors.WHITE, flex: 1},
  contentContainer: {paddingBottom: 60},
});

export default DoneScreen;
