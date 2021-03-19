import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {Typography, Colors} from '../styles';
import Button from '../components/Button';
import {AppContext} from '../context/AppContext';
import {Constants} from '../utils';
import {WorkerContext} from '../context/WorkerContext';
import Loader from '../components/Loader';
import TimerComponent from '../components/TimerComponent';
import ItemSection from '../components/ItemSection';
import Divider from '../components/Divider';

const now = new Date();

const ItemScreen = ({
  navigation,
  route: {
    params: {item, timeLeft, startTime, endTime},
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

  const {setItemPicked, getOrdersList, getDropList} = useContext(WorkerContext);

  const onManualEntry = async itemsQty => {
    setIsLoading(true);
    await setItemPicked(item?.id, item?.item_type, itemsQty).then(async () => {
      await getOrdersList();
      await getDropList();
      navigation.navigate('ItemSuccessScreen');
    });
    // setIsLoading(false);
  };

  let status = locale?.status?.cn;

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
          quantity={
            item?.qty ? item?.qty : item?.repick_qty ? item?.repick_qty : 0
          }
          position={item?.position}
          department={item?.department}
          type={item?.order_type ? item?.order_type : locale?.status?.SD}
          status={status}
          startTime={startTime}
          endTime={endTime}
          img={item?.image_url}
          locale={locale}
        />
        <View style={styles.skuBox}>
          <Text>SKU : {item?.sku ? item?.sku : Constants.emptySku}</Text>
        </View>
        <VerifyItemSection
          navigation={navigation}
          item={item}
          timeOut={timeOut}
          setTimerOut={() => {
            setTimeOut(true);
          }}
          onManualEntry={onManualEntry}
          startTime={startTime}
          endTime={endTime}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const VerifyItemSection = ({
  navigation,
  item,
  timeOut,
  setTimerOut,
  onManualEntry,
  startTime,
  endTime,
}) => {
  const {
    locale: {locale},
  } = useContext(AppContext);

  return (
    <>
      <Divider />
      <View>
        <>
          <View style={{marginHorizontal: 32, marginVertical: 20}}>
            <Text style={Typography.bold21}>{locale?.IS_status}</Text>
            <Text style={{marginVertical: 10}}>{locale?.IS_statusText}</Text>
          </View>
          <Divider />
        </>

        <View style={{marginHorizontal: 32}}>
          <Button
            scanButton
            iconType={'tick'}
            title={locale?.IS_ready}
            titleStyle={[Typography.bold17White]}
            style={{padding: 30, marginTop: 20}}
            onPress={() => {}}
          />
          <Button
            scanButton
            title={locale?.IS_notAvail}
            titleStyle={Typography.bold17White}
            style={{padding: 30, marginVertical: 20}}
            onPress={() => {}}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: Colors.WHITE, flex: 1},
  timerDivider: {
    height: '100%',
    width: 1,
    backgroundColor: Colors.WHITE,
    opacity: 0.25,
  },
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
  timerContainer: {
    backgroundColor: Colors.secondaryRed,
    padding: 20,
    marginHorizontal: 32,
    marginVertical: 24,
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  timerContainer2: {padding: 10, marginHorizontal: 0, marginVertical: 0},
  flexDirectionRow: {flexDirection: 'row'},
  verifyBox: {paddingVertical: 10, paddingHorizontal: 32},
  verifyTitle: {...Typography.bold20, marginLeft: 20},
  verifyText: {...Typography.normal14, marginTop: 5, marginBottom: 10},
  verifyTitleBox: {flexDirection: 'row', alignItems: 'center'},
});

export default ItemScreen;
