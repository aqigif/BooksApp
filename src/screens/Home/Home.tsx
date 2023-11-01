// In App.js in a new project

import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function HomeScreen() {
  return (
    <View style={HomeStyle.container}>
      <Text>Home Screen</Text>
    </View>
  );
}

const HomeStyle = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

export default HomeScreen;
