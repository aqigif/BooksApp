// In App.js in a new project

import * as React from 'react';
import {Pressable, StyleSheet, Text, useWindowDimensions} from 'react-native';
import ImageRender from '../../../components/ImageRender';

interface IBooksItem extends TBook {
  onPress: () => void;
}

const BooksItem = ({title, author, cover_url, onPress}: IBooksItem) => {
  const {width} = useWindowDimensions();
  const widthFull = width - 40;
  const booksWidth = widthFull / 2;
  return (
    <Pressable
      onPress={onPress}
      style={[BooksItemStyle.bookContainer, {width: booksWidth}]}>
      <ImageRender
        source={{uri: cover_url}}
        style={[BooksItemStyle.bookContainerCover]}
      />
      <Text numberOfLines={1} style={BooksItemStyle.bookTitle}>
        {title}
      </Text>
      <Text numberOfLines={1} style={BooksItemStyle.bookAuthor}>
        {author}
      </Text>
    </Pressable>
  );
};

const BooksItemStyle = StyleSheet.create({
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
    marginBottom: 5,
  },
  bookContainerCover: {
    height: 200,
    width: 140,
    backgroundColor: '#d7d7d7',
    borderRadius: 4,
  },
});

export default BooksItem;
