// In App.js in a new project

import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import BooksItem from './components/BooksItem';
import useBooks from '../../state/books/store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useNavigationT from '../../hooks/useNavigationT';

type Props = NativeStackScreenProps<TRoutes, 'dashboard/books'>;

const BooksListScreen = ({route}: Props) => {
  const {key, subject} = route?.params;
  const {goBack, navigate} = useNavigationT();

  const {
    books,
    fetchBooks,
    fetchBooksNextPage,
    refreshing,
    refreshBooks,
    loading,
  } = useBooks();

  useEffect(() => {
    fetchBooks(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={BooksListStyle.header}>
        <Pressable onPress={goBack}>
          <Text style={{fontSize: 12}}>{'< Back'}</Text>
        </Pressable>
        <Text style={BooksListStyle.headerTitle}>{subject}</Text>
        <Text style={{color: 'white', fontSize: 12}}>{'< Back'}</Text>
      </View>
      <FlatList
        data={loading ? [] : books}
        refreshing={refreshing}
        onRefresh={() => refreshBooks(key)}
        initialNumToRender={3}
        contentContainerStyle={BooksListStyle.container}
        keyExtractor={item => item.key}
        windowSize={10}
        numColumns={2}
        ListEmptyComponent={
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            {loading ? <ActivityIndicator /> : <Text>Data Not Found</Text>}
          </View>
        }
        renderItem={({item}) => {
          return (
            <View>
              <BooksItem
                {...item}
                key={item.key}
                onPress={() =>
                  navigate('dashboard/books/detail', {
                    title: item.title,
                    key: item.key.replace('/works/', ''),
                  })
                }
              />
            </View>
          );
        }}
        onEndReached={() => fetchBooksNextPage(key)}
      />
    </>
  );
};

const BooksListStyle = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    height: 40,
    paddingHorizontal: 20,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 10,
  },
  headerSpacer: {
    height: 20,
  },
  headerTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
});

export default BooksListScreen;
