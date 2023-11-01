// In App.js in a new project

import * as React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';

import BooksItem from './components/BooksItem';
import useBooks from '../../state/books/store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useNavigationT from '../../hooks/useNavigationT';

type Props = NativeStackScreenProps<RootStackParamList, 'booksList'>;

const BooksListScreen = ({route}: Props) => {
  const {subject} = route?.params;
  const {goBack} = useNavigationT();

  const {books} = useBooks();
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
        data={books}
        initialNumToRender={3}
        contentContainerStyle={BooksListStyle.container}
        keyExtractor={item => item.title}
        windowSize={10}
        numColumns={2}
        ListHeaderComponent={
          <>
            <View style={BooksListStyle.headerSpacer} />
          </>
        }
        renderItem={({item}) => {
          return (
            <View>
              <BooksItem key={item.title} {...item} onPress={() => {}} />
            </View>
          );
        }}
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
    flex: 1,
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
