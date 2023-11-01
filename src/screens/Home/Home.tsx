// In App.js in a new project

import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import useSubject from '../../state/subjects/store';

import SubjectsSectionItem from './components/SubjectSectionItem';
import useNavigationT from '../../hooks/useNavigationT';

const HomeScreen = () => {
  const navigation = useNavigationT();
  const {topSubjects, fetchTopSubjects, loading} = useSubject();

  useEffect(() => {
    fetchTopSubjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FlatList
        data={loading ? [] : topSubjects}
        initialNumToRender={3}
        style={HomeStyle.container}
        keyExtractor={item => item.key}
        windowSize={10}
        ListEmptyComponent={
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            {loading ? <ActivityIndicator /> : <Text>Data Not Found</Text>}
          </View>
        }
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
