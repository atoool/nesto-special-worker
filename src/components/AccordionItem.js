import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {RightCaretSVG} from '../assets/svg/RightCaretSVG.svg';
import {Colors, Typography} from '../styles';
import {Constants} from '../utils';
import Divider from './Divider';
import ModalComponent from './ModalComponent';
import OrderComponent from './OrderComponent';
import TickComponent from './TickComponent';

const now = Date.now();
const AccordionItem = ({
  order: {
    id,
    sales_incremental_id,
    items,
    time_slot,
    binsAssigned,
    order_start_time,
    order_end_time,
  },
  index,
  itemCount,
  status,
  orderType,
  onPress,
  buttonTitle,
  onReadyPress,
  showReadyButton,
  userType,
  timeLeft = now,
  readyButtonLoading = false,
  locale,
}) => {
  time_slot = time_slot ? time_slot : {start_time: now, end_time: now};

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <OrderComponent
        orderId={sales_incremental_id}
        items={itemCount}
        status={status}
        orderType={orderType}
        index={index}
        startTime={time_slot.start_time}
        endTime={time_slot.end_time}
        timeLeft={timeLeft}
      />
      {items?.length !== 0 && (
        <FlatList
          data={items}
          style={styles.orderItemsList}
          keyExtractor={(item, indx) => `${indx}${item?.id}`}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={onPress ? () => onPress(item) : () => {}}
              disabled={!onPress}>
              <View style={styles.orderItem}>
                <View style={styles.departmentBox}>
                  <TickComponent
                    enabled={
                      userType === 'fisher'
                        ? item?.fishmongering_completed
                        : item?.butchering_completed
                    }
                  />
                  <View style={styles.textBox}>
                    <Text style={styles.itemTitle}>
                      {item?.total_qty
                        ? item?.total_qty
                        : item.qty
                        ? item.qty
                        : 1}
                      x {item.name ? item.name : Constants.emptyItemName}
                    </Text>
                  </View>
                </View>
                {onPress && <RightCaretSVG style={styles.rightIcon} />}
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <ModalComponent
        visible={modalVisible}
        text={userType === 'packer' ? locale?.PS_confirm : locale?.DS_confirm}
        button1Text={locale?.no}
        button2Text={locale?.yes}
        onButton1Press={() => setModalVisible(false)}
        onButton2Press={() => {
          setModalVisible(false);
          onReadyPress && onReadyPress(id, index);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginHorizontal: 32, marginVertical: 20},
  orderItemsList: {
    backgroundColor: Colors.offWhite,
    borderRadius: 7,
    paddingVertical: 10,
  },
  positionBox: {flexDirection: 'row', marginBottom: 5, flexWrap: 'wrap'},
  departmentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIcon: {marginRight: 20},
  orderItem: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {marginTop: 20},
  statusPill: {marginBottom: 5},
  itemTitle: {...Typography.bold15, flexWrap: 'wrap', marginVertical: 5},
  textBox: {width: '70%'},
  itemText: {...Typography.normal12, flexWrap: 'wrap'},
});

export default AccordionItem;
