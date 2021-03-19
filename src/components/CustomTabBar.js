import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Typography} from '../styles';
import GetIcon from '../assets/svg/GetIcon';

const CustomTabBar = ({state, descriptors, navigation, title}) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <View style={[styles.row]}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;
          const color = isFocused ? Colors.secondaryRed : Colors.tabBarInactive;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              onPress={onPress}
              style={[styles.tabContainer, {marginBottom: insets.bottom}]}
              key={index.toString()}>
              <GetIcon name={route.name} color={color} width={20} />
              <Text style={[{color, ...Typography.normal12}]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  tabContainer: {
    flex: 1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default CustomTabBar;
