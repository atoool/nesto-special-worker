import React from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {RightCaretSVG} from '../assets/svg/RightCaretSVG.svg';
import {Colors, Typography} from '../styles';
import {Constants} from '../utils';
import Divider from './Divider';
import OrderComponent from './OrderComponent';
import TickComponent from './TickComponent';

const now = Date.now();
const AccordionItem = ({
  order: {sales_incremental_id, items, time_slot},
  index,
  itemCount,
  status,
  orderType,
  onPress,
  userType,
  timeLeft = now,
}) => {
  time_slot = time_slot ? time_slot : {start_time: now, end_time: now};

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
        slotType={
          (orderType ?? 'scheduled') === 'scheduled' ? 'Scheduled' : 'Express'
        }
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
                      userType === 'butcher'
                        ? item?.butchering_completed
                        : item?.fishmongering_completed
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
