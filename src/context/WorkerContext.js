import React, {createContext, useState, useContext} from 'react';
import {
  getOrdersListPick,
  getOrdersDropList,
  setItemReady,
  setNotAvailable,
} from '../api';
import {AppContext} from './AppContext';

export const WorkerContext = createContext({
  orders: [],
  dropList: [],
  getOrdersList: async () => {},
  getDropList: async () => {},
  setItemReady: async () => {},
  setNotAvailable: async () => {},
});

export const WorkerContextProvider = ({children}) => {
  const [orders, setOrders] = useState([]);
  const [dropList, setDropList] = useState([]);

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

  const value = {
    orders,
    dropList,
    getOrdersList, //
    getDropList, //
    setItemReady: async (id, item_type) =>
      await setItemReady(id, item_type, locale),
    setNotAvailable: async (id, item_type) =>
      await setNotAvailable(id, item_type, locale),
  };
  return (
    <WorkerContext.Provider value={value}>{children}</WorkerContext.Provider>
  );
};
