/* eslint-disable react-native/no-inline-styles */
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
import ImageRender from '../../components/ImageRender';
import useBooksDetail from '../../state/books/bookDetailStore';
import DatePicker from 'react-native-date-picker';
import {FormikProps, useFormik} from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import useCheckoutBook from '../../state/checkout/store';

type Props = NativeStackScreenProps<TRoutes, 'dashboard/checkout'>;

interface ICheckoutBooksForm {
  name: string;
  email: string;
  borrow_time: string;
}

const CheckoutBooksScreen = ({route}: Props) => {
  const [openDate, setOpenDate] = React.useState(false);
  const {key} = route?.params;
  const {goBack, navigate} = useNavigationT();

  const {checkoutBorrowBook} = useCheckoutBook();
  const {dataDetail} = useBooksDetail();
  const {author, cover_url, title} = dataDetail;

  const formik: FormikProps<ICheckoutBooksForm> = useFormik<ICheckoutBooksForm>(
    {
      initialValues: {
        name: '',
        email: '',
        borrow_time: new Date().toISOString(),
      },
      validationSchema: Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Email is required'),
        borrow_time: Yup.date().required('Datetime is required'),
      }),
      onSubmit: async (values: ICheckoutBooksForm) => {
        try {
          await checkoutBorrowBook({...values, borrowed_book: dataDetail});
          navigate('dashboard/checkout/success', {key: key});
        } catch (error) {
          console.log(error);
        }
      },
    },
  );
  return (
    <>
      <View style={CheckoutBooksStyle.header}>
        <Pressable onPress={goBack}>
          <Text style={{fontSize: 12}}>{'< Back'}</Text>
        </Pressable>
        <Text style={CheckoutBooksStyle.headerTitle}>Checkout</Text>
        {/* TODO: remove this hacks for centerized title */}
        <Text style={{color: 'white', fontSize: 12}}>{'< Back'}</Text>
      </View>
      <ScrollView>
        <View style={CheckoutBooksStyle.bookContainer}>
          <ImageRender
            source={{uri: cover_url}}
            style={[CheckoutBooksStyle.bookContainerCover]}
          />
          <Text numberOfLines={1} style={CheckoutBooksStyle.bookTitle}>
            {title}
          </Text>
          <Text numberOfLines={1} style={CheckoutBooksStyle.bookAuthor}>
            {author}
          </Text>
          <View style={{width: '100%', marginVertical: 40}}>
            <View>
              <Text>Borrow Time*</Text>
              <TextInput
                placeholder="Pick your borrow time"
                value={dayjs(new Date(formik.values.borrow_time)).format(
                  'D MMMM YYYY',
                )}
                onPressIn={() => setOpenDate(true)}
                onFocus={formik.handleBlur('borrow_time')}
                style={{
                  width: '100%',
                  height: 40,
                  borderRadius: 4,
                  borderColor: '#d7d7d7',
                  borderWidth: 1,
                  paddingHorizontal: 10,
                }}
              />
              <DatePicker
                modal
                mode="date"
                open={openDate}
                date={new Date(formik.values.borrow_time)}
                onConfirm={date => {
                  setOpenDate(false);
                  formik.handleChange('borrow_time')(date.toString());
                }}
                onCancel={() => {
                  setOpenDate(false);
                }}
              />
            </View>
            <Text style={{fontSize: 10}}>
              Select your date, and come to library within 9am - 16pm
            </Text>
            <Text style={{fontSize: 10}}>
              You can only borrow this books for a weeks
            </Text>
            <Text style={{fontSize: 10, marginBottom: 10}}>
              [read term and conditions for more detail]
            </Text>
            {formik.touched.borrow_time && !!formik.errors.borrow_time && (
              <Text
                style={{
                  color: 'red',
                  fontSize: 10,
                  marginTop: -8,
                  marginBottom: 10,
                }}>
                {formik.errors.borrow_time}
              </Text>
            )}
            <View>
              <Text>Name*</Text>
              <TextInput
                value={formik.values.name}
                onChangeText={formik.handleChange('name')}
                onFocus={formik.handleBlur('name')}
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
              {formik.touched.name && !!formik.errors.name && (
                <Text
                  style={{
                    color: 'red',
                    fontSize: 10,
                    marginTop: -8,
                    marginBottom: 10,
                  }}>
                  {formik.errors.name}
                </Text>
              )}
            </View>
            <View>
              <Text>Email*</Text>
              <TextInput
                placeholder="Type your email"
                value={formik.values.email}
                onFocus={formik.handleBlur('email')}
                onChangeText={formik.handleChange('email')}
                style={{
                  width: '100%',
                  height: 40,
                  borderRadius: 4,
                  borderColor: '#d7d7d7',
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  marginBottom: 10,
                }}
              />
              {formik.touched.email && !!formik.errors.email && (
                <Text
                  style={{
                    color: 'red',
                    fontSize: 10,
                    marginTop: -8,
                    marginBottom: 10,
                  }}>
                  {formik.errors.email}
                </Text>
              )}
            </View>
          </View>
          <Button
            title="Borrow this book now"
            onPress={() => formik.handleSubmit()}
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
    paddingHorizontal: 20,
    marginBottom: 40,
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

export default CheckoutBooksScreen;
