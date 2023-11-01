// In App.js in a new project

import * as React from 'react';
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useNavigationT from '../../hooks/useNavigationT';
import useBooks from '../../state/books/store';

type Props = NativeStackScreenProps<TRoutes, 'dashboard/checkout'>;

const CheckoutBooksScreen = ({route}: Props) => {
  const {title} = route?.params;
  const {goBack, navigate} = useNavigationT();

  const {books} = useBooks();
  const {author} = books[0];
  return (
    <>
      <View style={CheckoutBooksStyle.header}>
        <Pressable onPress={goBack}>
          <Text style={{fontSize: 12}}>{'< Back'}</Text>
        </Pressable>
        <Text style={CheckoutBooksStyle.headerTitle}>Checkout</Text>
        <Text style={{color: 'white', fontSize: 12}}>{'< Back'}</Text>
      </View>
      <ScrollView>
        <View style={CheckoutBooksStyle.bookContainer}>
          <View style={[CheckoutBooksStyle.bookContainerCover]}>
            <Text numberOfLines={2} style={CheckoutBooksStyle.bookTitleCover}>
              {title}
            </Text>
            <Text numberOfLines={2} style={CheckoutBooksStyle.bookAuthorCover}>
              {author}
            </Text>
          </View>
          <Text numberOfLines={1} style={CheckoutBooksStyle.bookTitle}>
            {title}
          </Text>
          <Text numberOfLines={1} style={CheckoutBooksStyle.bookAuthor}>
            {author}
          </Text>
          <View style={{width: '100%', paddingHorizontal: 20, marginTop: 40}}>
            <View>
              <Text>Borrow Time</Text>
              <TextInput
                placeholder="Pick your borrow time"
                style={{
                  width: '100%',
                  height: 40,
                  borderRadius: 4,
                  borderColor: '#d7d7d7',
                  borderWidth: 1,
                  paddingHorizontal: 10,
                }}
              />
            </View>
            <Text style={{fontSize: 10}}>
              You can only borrow this books for a weeks
            </Text>
            <Text style={{fontSize: 10, marginBottom: 10}}>
              [read term and conditions for more detail]
            </Text>
            <View>
              <Text>Name</Text>
              <TextInput
                placeholder="Type your name"
                style={{
                  width: '100%',
                  height: 40,
                  borderRadius: 4,
                  borderColor: '#d7d7d7',
                  borderWidth: 1,
                  marginBottom: 10,
                  paddingHorizontal: 10,
                }}
              />
            </View>
            <View>
              <Text>Email</Text>
              <TextInput
                placeholder="Type your email"
                style={{
                  width: '100%',
                  height: 40,
                  borderRadius: 4,
                  borderColor: '#d7d7d7',
                  borderWidth: 1,
                  marginBottom: 10,
                  paddingHorizontal: 10,
                }}
              />
            </View>
          </View>
          <Button
            title="Borrow this book now"
            onPress={() =>
              navigate('dashboard/checkout/success', {title: title})
            }
          />
        </View>
      </ScrollView>
    </>
  );
};

const CheckoutBooksStyle = StyleSheet.create({
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

export default CheckoutBooksScreen;
