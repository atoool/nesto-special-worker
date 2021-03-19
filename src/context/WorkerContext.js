import React, {createContext, useState, useContext} from 'react';
import {
  getOrdersListPick,
  getOrdersDropList,
  setItemPicked,
  setItemDrop,
  postSubstitutes,
  postSuggestedSubstitutes,
  getNotifications,
} from '../api';
import {AppContext} from './AppContext';

export const WorkerContext = createContext({
  orders: [],
  dropList: [],
  similarItems: [],
  substitutedList: [],
  pickerSuggestions: [],
  notifications: [],
  getOrdersList: async () => {},
  getDropList: async () => {},
  setItemPicked: async () => {},
  getSimilarItemList: async () => {},
  setItemDrop: async () => {},
  getPickerSuggestedItems: async () => {},
  getSubstitutedItems: async () => {},
  postSubstitutes: async () => {},
  postSuggestedSubstitutes: async () => {},
  getAllNotifications: async () => {},
});

export const WorkerContextProvider = ({children}) => {
  const [orders, setOrders] = useState([]);
  const [dropList, setDropList] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const {
    locale: {locale},
  } = useContext(AppContext);

  const getOrdersList = async () => {
    try {
      // const res = pickerOrders.data; //mock
      const res = await getOrdersListPick(locale);
      setOrders(res);
    } catch (e) {
      console.log(e);
    }
  };

  const getDropList = async () => {
    try {
      // const res = pickerDropList.data; //mock
      const res = await getOrdersDropList(locale);
      setDropList(res);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllNotifications = async () => {
    try {
      const list = await getNotifications(locale);
      const temp = list.filter(item => item.role === 'picker');
      setNotifications(temp?.reverse());
    } catch (e) {}
  };

  const value = {
    orders,
    dropList,
    notifications,
    getOrdersList, //
    getDropList, //
    setItemPicked: async (id, item_type, critical_qty) =>
      await setItemPicked(id, item_type, critical_qty, locale),
    setItemDrop: async id => await setItemDrop(id, locale),
    postSubstitutes: async PAYLOAD => await postSubstitutes(PAYLOAD, locale),
    postSuggestedSubstitutes: async PAYLOAD =>
      await postSuggestedSubstitutes(PAYLOAD, locale),
    getAllNotifications, //
  };
  return (
    <WorkerContext.Provider value={value}>{children}</WorkerContext.Provider>
  );
};
