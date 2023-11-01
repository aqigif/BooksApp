import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen} from '../screens';
import navigations from '../constants/navigation';

const Stack = createNativeStackNavigator();

export default function NavigationApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={navigations.home} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
