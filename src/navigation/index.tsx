import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen, BooksListScreen, BooksDetailScreen} from '../screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function NavigationApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={'home'} component={HomeScreen} />
        <Stack.Screen name={'booksList'} component={BooksListScreen} />
        <Stack.Screen name={'booksDetail'} component={BooksDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
