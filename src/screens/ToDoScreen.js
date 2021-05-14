import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {Colors} from '../styles';
//Components
import Title from '../components/Title';
import NoContent from '../components/NoContent';
//Mock Imports
import {AppContext} from '../context/AppContext';
import PickList from '../components/PickList';
import Divider from '../components/Divider';
import {WorkerContext} from '../context/WorkerContext';
import ModalComponent from '../components/ModalComponent';

const now = Date.now();

const ToDoScreen = ({route}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const {
    locale: {locale},
  } = useContext(AppContext);
  const {orders, getOrdersList} = useContext(WorkerContext);

  const _getOrdersList = async () => {
    setRefreshing(true);
    try {
      await getOrdersList();
      setRefreshing(false);
    } catch {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const onMount = async () => {
      if (route?.params?.logout ?? false) {
        return;
      }
      setLoading(true);
      await getOrdersList();
      setLoading(false);
    };
    onMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Title text={locale?.headings.todo} />
      <FlatList
        data={orders}
        ListEmptyComponent={() => (
          <NoContent name="NoOrdersSVG" isLoading={isLoading} />
        )}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${index}`}
        ItemSeparatorComponent={() => <Divider />}
        onRefresh={() => _getOrdersList()}
        refreshing={refreshing}
        renderItem={({item, index}) => (
          <PickList
            items={item?.items ? item?.items : []}
            index={index}
            orderType={item?.order_type ? item?.order_type : locale?.status?.SD}
            itemCount={''}
            startTime={
              item?.timeslot?.start_time ? item?.timeslot?.start_time : now
            }
            endTime={item?.timeslot?.end_time ? item?.timeslot?.end_time : now}
            timeLeft={
              item?.pickingDeadlineTimestamp
                ? item?.pickingDeadlineTimestamp
                : now
            }
            slotType={
              (item?.order_type ?? 'scheduled') === 'scheduled'
                ? 'Scheduled'
                : 'Express'
            }
          />
        )}
      />
      <ModalComponent
        visible={route?.params?.logout ?? false}
        text="Logging out. Please wait."
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: Colors.WHITE, flex: 1},
  contentContainer: {paddingBottom: 60},
});

export default ToDoScreen;
