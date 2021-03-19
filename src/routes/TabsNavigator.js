import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//Screens/Navigators
import ProfileScreen from '../screens/ProfileScreen';
import DoneScreen from '../screens/DoneScreen';

import {useFirebase, useSubscribeTopic} from '../hooks/useFirebase';
import {AppContext} from '../context/AppContext';
import CustomTabBar from '../components/CustomTabBar';
import ToDoStack from './ToDoStack';

const Tabs = createBottomTabNavigator();

export const TabsNavigator = () => {
  const {
    locale: {locale},
  } = useContext(AppContext);
  useFirebase();
  useSubscribeTopic('picker');
  return (
    <Tabs.Navigator
      initialRouteName="ToDo"
      screenOptions={{tabBarVisible: false}}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tabs.Screen
        name="ToDo"
        options={{title: locale?.headings?.todo}}
        component={ToDoStack}
      />
      <Tabs.Screen
        name="Done"
        options={{title: locale?.headings?.done}}
        component={DoneScreen}
      />
      <Tabs.Screen
        name="Profile"
        options={{title: locale?.headings?.profile}}
        component={ProfileScreen}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
