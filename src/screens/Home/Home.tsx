// In App.js in a new project

import * as React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import useSubject from '../../state/subjects/store';

import SubjectsSectionItem from './components/SubjectSectionItem';

const HomeScreen = () => {
  const {topSubjects} = useSubject();
  return (
    <>
      <FlatList
        data={topSubjects}
        initialNumToRender={3}
        style={HomeStyle.container}
        keyExtractor={item => item.name}
        windowSize={10}
        ListHeaderComponent={
          <>
            <View>
              <Text style={HomeStyle.headerTitle}>Books Library</Text>
              <Text>Home of Mind</Text>
            </View>
            <View style={HomeStyle.headerSpacer} />
          </>
        }
        renderItem={({item}) => (
          <SubjectsSectionItem key={item.name} {...item} onPress={() => {}} />
        )}
      />
    </>
  );
};

const HomeStyle = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerSpacer: {
    height: 20,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default HomeScreen;
