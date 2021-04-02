import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Typography} from '../styles';
import Button from './Button';
import Divider from './Divider';

const VerifyItemSection = ({
  item,
  onManualEntry,
  onSetNotAvailable,
  locale,
}) => {
  return (
    <>
      <Divider />
      <View>
        <>
          <View style={styles.verifyStatusBox}>
            <Text style={Typography.bold21}>{locale?.IS_status}</Text>
            <Text style={styles.verifyStatusText}>{locale?.IS_statusText}</Text>
          </View>
          <Divider />
        </>

        <View style={styles.verifyStatusBox}>
          <Button
            scanButton
            iconType={'tick'}
            title={locale?.IS_ready}
            titleStyle={[Typography.bold17White]}
            style={styles.button}
            onPress={onManualEntry}
          />
          {!item?.assigned_item && (
            <Button
              scanButton
              title={locale?.IS_notAvail}
              titleStyle={Typography.bold17White}
              style={styles.button}
              onPress={onSetNotAvailable}
            />
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  verifyStatusBox: {marginHorizontal: 32, marginVertical: 20},
  verifyStatusText: {marginVertical: 10, ...Typography.normal15},
  button: {
    padding: 30,
    paddingVertical: 10,
    marginBottom: 20,
  },
});

export default VerifyItemSection;
