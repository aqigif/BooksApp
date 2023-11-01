/* eslint-disable react-native/no-inline-styles */
// In App.js in a new project

import * as React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useNavigationT from '../../hooks/useNavigationT';
import useCheckoutBook from '../../state/checkout/store';
import dayjs from 'dayjs';

type Props = NativeStackScreenProps<TRoutes, 'dashboard/checkout/success'>;

const CheckoutBooksSuccessScreen = ({}: Props) => {
  const {goBack} = useNavigationT();

  const {borrowed_book, id, name, email, borrow_time} = useCheckoutBook();
  return (
    <>
      <View style={CheckoutBooksSuccessStyle.header}>
        <Pressable onPress={goBack}>
          <Text style={{fontSize: 12}}>{'< Back'}</Text>
        </Pressable>
        <Text style={CheckoutBooksSuccessStyle.headerTitle}>
          Checkout Success
        </Text>
        {/* TODO: remove this hacks for centerized title */}
        <Text style={{color: 'white', fontSize: 12}}>{'< Back'}</Text>
      </View>
      <View style={CheckoutBooksSuccessStyle.bookContainer}>
        <Text
          style={[
            CheckoutBooksSuccessStyle.bookAuthor,
            {fontSize: 14, marginBottom: 5},
          ]}>
          Checkout of{' '}
          <Text style={CheckoutBooksSuccessStyle.bookTitle}>
            {borrowed_book?.title}
          </Text>
          ,{' '}
          <Text style={CheckoutBooksSuccessStyle.bookTitle}>
            {borrowed_book?.author}
          </Text>{' '}
          is success
        </Text>
        <Text
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
        <View style={{width: '100%', marginTop: 40}}>
          <Text style={{marginBottom: 10, fontSize: 12}}>Booking Detail</Text>
          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 12}}>Booking ID :</Text>
            <Text style={{fontSize: 12, fontWeight: 'bold'}}>{id}</Text>
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 12}}>Name:</Text>
            <Text style={{fontSize: 12, fontWeight: 'bold'}}>{name}</Text>
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 12}}>Email:</Text>
            <Text style={{fontSize: 12, fontWeight: 'bold'}}>{email}</Text>
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 12}}>Borrow Time:</Text>
            <Text style={{fontSize: 12, fontWeight: 'bold'}}>
              {dayjs(new Date(borrow_time)).format('D MMMM YYYY')}
            </Text>
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 12}}>Book:</Text>
            <Text style={{fontSize: 12}}>
              <Text style={{fontWeight: 'bold'}}>{borrowed_book?.title}</Text>,
              by {borrowed_book?.author}
            </Text>
          </View>
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
    textAlign: 'center',
  },
  bookContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
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
