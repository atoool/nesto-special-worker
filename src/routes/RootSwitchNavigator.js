import React, {useContext, useState, useEffect} from 'react';
import {Alert, Linking} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import remoteConfig from '@react-native-firebase/remote-config';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import TabsNavigator from './TabsNavigator';
import {AuthContext} from '../context/AuthContext';
import {WorkerContextProvider} from '../context/WorkerContext';
import {version} from '../../package.json';

const Stack = createStackNavigator();

const RootSwitchNavigator = () => {
  const {authStateLoading, userType} = useContext(AuthContext);
  const [configLoading, setConfigLoading] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    fetchRemoteConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRemoteConfig = async () => {
    try {
      await remoteConfig().fetch(0);
      await remoteConfig().activate();
      const _maintenanceMode =
        remoteConfig().getString('specialWorkerMaintenanceMode') === 'true';
      const minVersion = remoteConfig().getString('specialWorkerMinVersion');
      const _updateAvailable = version < minVersion;
      setUpdateAvailable(_updateAvailable);
      if (_maintenanceMode) {
        Alert.alert(
          '',
          'Server under maintenance. Please try again later',
          [{text: 'Refresh', onPress: fetchRemoteConfig}],
          {cancelable: false},
        );
      } else if (_updateAvailable) {
        Alert.alert(
          '',
          'Please update app to continue',
          [{text: 'Update', onPress: handleAppUpdate}],
          {cancelable: false},
        );
      }
      setMaintenanceMode(_maintenanceMode ?? false);
    } catch {}
    setConfigLoading(false);
  };

  const handleAppUpdate = () =>
    Linking.openURL(
      'https://play.google.com/store/apps/details?id=com.nesto.specialworker',
    );

  return authStateLoading ||
    configLoading ||
    maintenanceMode ||
    updateAvailable ? (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  ) : userType.toLowerCase() === 'fishmonger' ||
    userType.toLowerCase() === 'butcher' ? (
    <WorkerContextProvider>
      <TabsNavigator />
    </WorkerContextProvider>
  ) : (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootSwitchNavigator;
