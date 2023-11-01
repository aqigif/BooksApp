// In App.js in a new project

import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useNavigationT from '../../hooks/useNavigationT';
import useBooksDetail from '../../state/books/bookDetailStore';
import ImageRender from '../../components/ImageRender';

type Props = NativeStackScreenProps<TRoutes, 'dashboard/books/detail'>;

const BooksDetailScreen = ({route}: Props) => {
  const {title, key} = route?.params;
  const {goBack, navigate} = useNavigationT();

  const {dataDetail, fetchDataDetail, loading} = useBooksDetail();
  const {author, cover_url, description} = dataDetail;

  useEffect(() => {
    fetchDataDetail(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <View
        style={[BooksDetailStyle.bookContainer, {justifyContent: 'center'}]}>
        <ActivityIndicator />
      </View>
    );
  }
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
        <ImageRender
          source={{uri: cover_url}}
          style={[BooksDetailStyle.bookContainerCover]}
        />
        <Text numberOfLines={1} style={BooksDetailStyle.bookTitle}>
          {title}
        </Text>
        <Text numberOfLines={1} style={BooksDetailStyle.bookAuthor}>
          {author}
        </Text>
        <Text
          style={[
            BooksDetailStyle.bookAuthor,
            {textAlign: 'justify', marginBottom: 10},
          ]}>
          {description}
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
    paddingHorizontal: 20,
  },
  bookContainerCover: {
    height: 200,
    width: 140,
    backgroundColor: '#d7d7d7',
    borderRadius: 4,
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
