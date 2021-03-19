import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ItemScreen from '../screens/ItemScreen';
import ToDoScreen from '../screens/ToDoScreen';
import ItemSuccessScreen from '../screens/ItemSuccessScreen';

const Stack = createStackNavigator();

const ToDoStack = () => {
  return (
    <Stack.Navigator initialRouteName="ToDoScreen" header>
      <Stack.Screen
        name="ToDoScreen"
        component={ToDoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ItemScreen"
        component={ItemScreen}
        options={({route}) => ({
          title: '#' + route?.params?.sales_incremental_id,
          ...headerOptions,
        })}
      />
      <Stack.Screen
        name="ItemSuccessScreen"
        component={ItemSuccessScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const headerOptions = {
  headerTitleAlign: 'center',
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export default ToDoStack;
