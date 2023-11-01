// In App.js in a new project

import * as React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useNavigationT from '../../hooks/useNavigationT';
import useBooks from '../../state/books/store';

type Props = NativeStackScreenProps<TRoutes, 'dashboard/checkout/success'>;

const CheckoutBooksSuccessScreen = ({route}: Props) => {
  const {title} = route?.params;
  const {goBack} = useNavigationT();

  const {books} = useBooks();
  const {author} = books[0];
  return (
    <>
      <View style={CheckoutBooksSuccessStyle.header}>
        <Pressable onPress={goBack}>
          <Text style={{fontSize: 12}}>{'< Back'}</Text>
        </Pressable>
        <Text style={CheckoutBooksSuccessStyle.headerTitle}>
          Checkout Success
        </Text>
        <Text style={{color: 'white', fontSize: 12}}>{'< Back'}</Text>
      </View>
      <View style={CheckoutBooksSuccessStyle.bookContainer}>
        <Text
          numberOfLines={1}
          style={[
            CheckoutBooksSuccessStyle.bookAuthor,
            {fontSize: 14, marginBottom: 5},
          ]}>
          Checkout of{' '}
          <Text numberOfLines={1} style={CheckoutBooksSuccessStyle.bookTitle}>
            {title}
          </Text>
          ,{' '}
          <Text numberOfLines={1} style={CheckoutBooksSuccessStyle.bookTitle}>
            {author}
          </Text>{' '}
          is success
        </Text>
        <Text
          numberOfLines={1}
          style={[CheckoutBooksSuccessStyle.bookAuthor, {marginBottom: 10}]}>
          Show this QR to Library to get the book
        </Text>
        <View style={[CheckoutBooksSuccessStyle.bookContainerCover]}>
          <Text
            numberOfLines={2}
            style={CheckoutBooksSuccessStyle.bookTitleCover}>
            QR
          </Text>
        </View>
      </View>
    </>
  );
};

const CheckoutBooksSuccessStyle = StyleSheet.create({
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
    height: 140,
    width: 140,
    backgroundColor: 'grey',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
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

export default CheckoutBooksSuccessScreen;
