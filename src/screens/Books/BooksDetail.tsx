// In App.js in a new project

import React, {useEffect} from 'react';
import {Button, Pressable, StyleSheet, Text, View} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useNavigationT from '../../hooks/useNavigationT';
import useBooksDetail from '../../state/books/bookDetailStore';

type Props = NativeStackScreenProps<TRoutes, 'dashboard/books/detail'>;

const BooksDetailScreen = ({route}: Props) => {
  const {title, key} = route?.params;
  const {goBack, navigate} = useNavigationT();

  const {dataDetail, fetchDataDetail} = useBooksDetail();
  const {author} = dataDetail;

  useEffect(() => {
    fetchDataDetail(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={BooksDetailStyle.header}>
        <Pressable onPress={goBack}>
          <Text style={{fontSize: 12}}>{'< Back'}</Text>
        </Pressable>
        <Text style={BooksDetailStyle.headerTitle}>{title}</Text>
        <Text style={{color: 'white', fontSize: 12}}>{'< Back'}</Text>
      </View>
      <View style={BooksDetailStyle.bookContainer}>
        <View style={[BooksDetailStyle.bookContainerCover]}>
          <Text numberOfLines={2} style={BooksDetailStyle.bookTitleCover}>
            {title}
          </Text>
          <Text numberOfLines={2} style={BooksDetailStyle.bookAuthorCover}>
            {author}
          </Text>
        </View>
        <Text numberOfLines={1} style={BooksDetailStyle.bookTitle}>
          {title}
        </Text>
        <Text numberOfLines={1} style={BooksDetailStyle.bookAuthor}>
          {author}
        </Text>
        <Button
          title="Borrow this book"
          onPress={() => navigate('dashboard/checkout', {title: title})}
        />
      </View>
    </>
  );
};

const BooksDetailStyle = StyleSheet.create({
  bookTitleCover: {
    fontWeight: 'bold',
    color: 'white',
  },
  bookAuthorCover: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  bookTitle: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  bookAuthor: {
    fontSize: 12,
  },
  bookContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bookContainerCover: {
    height: 200,
    width: 140,
    backgroundColor: 'grey',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    height: 40,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 10,
  },
  headerTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
});

export default BooksDetailScreen;
