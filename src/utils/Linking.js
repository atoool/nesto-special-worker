import {Linking as Linker} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const config = {
  screens: {
    LoginScreen: 'LoginScreen',
    ToDo: {
      initialRouteName: 'ToDoScreen',
      screens: {
        ToDoScreen: 'ToDoScreen',
        ItemScreen: {path: 'ToDo/ItemScreen/:item'},
        ItemSuccessScreen: 'ToDo/ItemSuccessScreen',
      },
    },
    Done: 'Done',
    Profile: {
      screens: {
        ProfileScreen: 'ProfileScreen',
        StatisticsScreen: 'Profile/StatisticsScreen',
      },
    },
  },
};
const Linking = {
  prefixes: ['http://com.nesto.store'],
  config,
  async getInitialURL() {
    const url = await Linker.getInitialURL();

    if (url != null) {
      return url;
    }
    const message = await messaging().getInitialNotification();
    return message?.data.key_1;
  },
};
export default Linking;
