import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import TabsNavigator from './TabsNavigator';
import {AuthContext} from '../context/AuthContext';
import {WorkerContextProvider} from '../context/WorkerContext';

const Stack = createStackNavigator();

const RootSwitchNavigator = () => {
  const {authStateLoading, userType} = useContext(AuthContext);
  if (authStateLoading) {
    return (
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  } else if (userType.toLowerCase() === 'picker') {
    return (
      <WorkerContextProvider>
        <TabsNavigator />
      </WorkerContextProvider>
    );
  } else {
    return (
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }
};

export default RootSwitchNavigator;
