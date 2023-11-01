import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  HomeScreen,
  BooksListScreen,
  BooksDetailScreen,
  CheckoutBooksScreen,
  CheckoutBooksSuccessScreen,
} from '../screens';

const Stack = createNativeStackNavigator<TRoutes>();

export default function NavigationApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={'dashboard/home'} component={HomeScreen} />
        <Stack.Screen name={'dashboard/books'} component={BooksListScreen} />
        <Stack.Screen
          name={'dashboard/books/detail'}
          component={BooksDetailScreen}
        />
        <Stack.Screen
          name={'dashboard/checkout'}
          component={CheckoutBooksScreen}
        />
        <Stack.Screen
          name={'dashboard/checkout/success'}
          component={CheckoutBooksSuccessScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
