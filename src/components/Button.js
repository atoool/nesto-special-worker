import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TickSVG from '../assets/svg/TickSVG.svg';
import CloseSVG from '../assets/svg/CloseSVG.svg';
import {Colors, Typography} from '../styles';
import Loader from './Loader';

const Button = ({
  title,
  onPress,
  loading,
  style,
  titleStyle,
  subtitle,
  scanButton,
  disabled,
  iconType,
}) => (
  <TouchableOpacity
    disabled={disabled || loading}
    onPress={onPress}
    hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
    <View
      style={[
        styles.btnStyle,
        style,
        {
          backgroundColor: disabled
            ? Colors.primary4
            : iconType === 'tick'
            ? Colors.secondaryGreen
            : Colors.secondaryRed,
        },
      ]}>
      <View
        style={[
          styles.titleView,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            justifyContent: scanButton ? 'space-between' : 'center',
          },
        ]}>
        <View>
          {loading && <Loader small={true} />}
          {!loading && (
            <Text style={[styles.textStyle, titleStyle]}>{title}</Text>
          )}
        </View>
        {scanButton && (
          <View style={styles.iconStyle}>
            {iconType === 'tick' ? (
              <TickSVG color={Colors.secondaryGreen} />
            ) : (
              <CloseSVG color={Colors.secondaryRed} />
            )}
          </View>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: Colors.secondaryRed,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  textStyle: Typography.buttonTitleText,
  subtitleStyle: {...Typography.normal12White, marginBottom: 5},
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  iconStyle: {
    backgroundColor: Colors.WHITE,
    width: 40,
    height: 40,
    borderRadius: 40,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
