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

export const getNotifications = async locale => {
  const URL = '/picker-packer/notifications';
  return get(URL).catch(e => {
    console.log(e);
    ToastAndroid.show(locale?.errorAlert, ToastAndroid.SHORT);
  });
};

export const getOrdersListPick = async locale => {
  const URL = '/picker/order-list-pick';
  return get(URL, true, false).catch(e => {
    console.log(e);
    ToastAndroid.show(locale?.errorAlert, ToastAndroid.SHORT);
  });
};
export const getOrdersDropList = async locale => {
  const URL = '/picker/order-list-drop';
  return get(URL, true, false).catch(e => {
    console.log(e);
    ToastAndroid.show(locale?.errorAlert, ToastAndroid.SHORT);
  });
};
export const setItemPicked = async (id, item_type, critical_qty, locale) => {
  const URL = `/picker/item/pick/${id}`;
  const extraParams = `${
    critical_qty ? '&critical_qty=' + critical_qty : ''
  }&item_type=${item_type}`;
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
export const setItemDrop = async (id, locale) => {
  const URL = `/picker/order/drop/${id}`;
  return get(URL, true)
    .then(() => {
      // ToastAndroid.show(locale?.success, ToastAndroid.SHORT);
    })
    .catch(e => {
      console.log(e);
      ToastAndroid.show(locale?.errorAlert, ToastAndroid.SHORT);
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
