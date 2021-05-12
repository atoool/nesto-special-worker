import React, {useContext, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, ScrollView} from 'react-native';
import moment from 'moment-timezone';

import {Colors} from '../styles';
import {AppContext} from '../context/AppContext';
import {Constants} from '../utils';
import {WorkerContext} from '../context/WorkerContext';
import Loader from '../components/Loader';
import TimerComponent from '../components/TimerComponent';
import ItemSection from '../components/ItemSection';
import VerifyItemSection from '../components/VerifyItemSection';

const now = new Date();

const ItemScreen = ({
  navigation,
  route: {
    params: {
      item,
      timeLeft,
      startTime,
      endTime,
      slotType,
      sales_incremental_id,
    },
  },
}) => {
  const ss = timeLeft
    ? new Date(timeLeft) <= now
      ? 0
      : new Date(timeLeft) / 1000 - now / 1000
    : 0;
  const [timeOut, setTimeOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    locale: {locale},
  } = useContext(AppContext);

  const {
    setItemReady,
    getOrdersList,
    getDropList,
    setNotAvailable,
  } = useContext(WorkerContext);

  const onManualEntry = async () => {
    setIsLoading(true);
    try {
      await setItemReady(item?.id, item?.item_type).then(async () => {
        await getOrdersList();
        await getDropList();
        navigation.navigate('ItemSuccessScreen');
      });
    } catch {
      setIsLoading(false);
    }
  };

  const onSetNotAvailable = async () => {
    setIsLoading(true);
    try {
      await setNotAvailable(item?.id, item?.item_type).then(async () => {
        await getOrdersList();
        await getDropList();
        navigation.popToTop();
      });
    } catch {
      setIsLoading(false);
    }
  };

  const onImagePress = () =>
    navigation.navigate('ViewImageScreen', {
      source: item?.image_url,
      sales_incremental_id,
    });

  let status = item?.assigned_item
    ? locale?.status?.sc
    : item?.bf_substitution_initiated
    ? locale?.status?.si
    : locale?.status?.cn;
  let qty = item?.qty ? item?.qty : item?.repick_qty ? item?.repick_qty : 0;

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Loader fullScreen />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TimerComponent fullTimer ss={ss} />
        <ItemSection
          title={item?.name ? item?.name : Constants.emptyItemName}
          price={item?.price ? item?.price?.toFixed(2) : 0}
          quantity={qty}
          position={item?.position}
          department={item?.department}
          type={item?.order_type ? item?.order_type : locale?.status?.SD}
          status={status}
          startTime={startTime}
          endTime={endTime}
          img={item?.image_url}
          locale={locale}
          slotType={slotType}
          date={moment(startTime)?.format('Do MMM, YYYY')}
          onImagePress={onImagePress}
        />
        <View style={styles.skuBox}>
          <Text>SKU : {item?.sku ? item?.sku : Constants.emptySku}</Text>
        </View>
        {!item?.bf_substitution_initiated && (
          <VerifyItemSection
            navigation={navigation}
            item={item}
            timeOut={timeOut}
            setTimerOut={() => setTimeOut(true)}
            onManualEntry={onManualEntry}
            onSetNotAvailable={onSetNotAvailable}
            startTime={startTime}
            endTime={endTime}
            locale={locale}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: Colors.WHITE, flex: 1},
  skuBox: {
    backgroundColor: Colors.offWhite,
    padding: 10,
    borderRadius: 7,
    height: 60,
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 32,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  loading: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.WHITE,
  },
});

export default ItemScreen;
