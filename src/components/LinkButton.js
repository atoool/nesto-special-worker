import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors, Typography} from '../styles';
import RightCaretSVG from '../assets/svg/RightCaretSVG.svg';

const LinkButton = ({title, topBorder, onPress}) => {
  const borderStyle = {
    borderTopWidth: topBorder ? 1 : 0,
  };
  return (
    <TouchableOpacity
      style={[styles.linkButton, borderStyle]}
      onPress={onPress}>
      <Text style={[styles.linkButtonText, Typography.bold21]}>{title}</Text>
      <RightCaretSVG />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: Colors.WHITE, flex: 1},
  linkButton: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderBottomWidth: 1,
    borderColor: '#DFDEDE',
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkButtonText: {
    flex: 1,
  },
});

export default LinkButton;
