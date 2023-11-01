// In App.js in a new project

import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import useSubject from '../../state/subjects/store';

import SubjectsSectionItem from './components/SubjectSectionItem';
import useNavigationT from '../../hooks/useNavigationT';

const HomeScreen = () => {
  const navigation = useNavigationT();
  const {topSubjects, fetchTopSubjects} = useSubject();

  useEffect(() => {
    fetchTopSubjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FlatList
        data={topSubjects}
        initialNumToRender={3}
        style={HomeStyle.container}
        keyExtractor={item => item.key}
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
          <SubjectsSectionItem
            {...item}
            key={item.key}
            onPress={() =>
              navigation.navigate('dashboard/books', {
                key: item.key,
                subject: item.name,
              })
            }
          />
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
