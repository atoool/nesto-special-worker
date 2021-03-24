import {ToastAndroid} from 'react-native';
import {post, get} from './networkUtils';

// Endpoints that Doesn't Require Authentication
export const login = async (PAYLOAD, locale) => {
  const URL = '/basic/login';
  return post(URL, PAYLOAD, false).catch(e => {
    console.log(e);
    ToastAndroid.show(e, ToastAndroid.SHORT);
  });
};

export const getOrdersListPick = async locale => {
  const URL = '/order-list-todo';
  return get(URL, true, false).catch(e => {
    console.log(e);
    ToastAndroid.show(locale?.errorAlert, ToastAndroid.SHORT);
  });
};
export const getOrdersDropList = async locale => {
  const URL = '/order-list-done';
  return get(URL, true, false).catch(e => {
    console.log(e);
    ToastAndroid.show(locale?.errorAlert, ToastAndroid.SHORT);
  });
};
export const setItemPicked = async (id, item_type, locale) => {
  const URL = `/item/complete/${id}`;
  const extraParams = `&item_type=${item_type}`;
  return get(URL, true, true, extraParams)
    .then(() => {
      // ToastAndroid.show(locale?.success, ToastAndroid.SHORT);
    })
    .catch(e => {
      console.log(e);
      ToastAndroid.show(locale?.errorAlert, ToastAndroid.SHORT);
      throw e;
    });
};

export const getStatistics = async () => {
  const URL = '/statistics';
  return get(URL, true).catch(e => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  });
};

export const getUserProfile = async () => {
  const URL = '/profile';
  return get(URL, true).catch(e => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  });
};

// export const updateProfile = async (PAYLOAD) => {
//   const URL = '/profile';
//   return put(URL, PAYLOAD, true).catch((e) => {
//     ToastAndroid.show(e, ToastAndroid.SHORT);
//   });
// };

export const updateFCMToken = async (PAYLOAD, locale) => {
  const URL = '/basic/add-fcm-token';
  return post(URL, PAYLOAD).catch(e => {
    console.error('Error Updating FCM Token');
  });
};
