// In App.js in a new project

import * as React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import useNavigationT from '../../../hooks/useNavigationT';

interface ISubjectsSectionItem extends TSubject {
  onPress: () => void;
}

const SubjectsSectionItem = ({name, books, onPress}: ISubjectsSectionItem) => {
  const navigation = useNavigationT();
  return (
    <>
      <View style={SubjectsSectionItemStyle.subjectSection}>
        <Text style={SubjectsSectionItemStyle.subjectTitle}>{name}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {books.map((item, index) => {
            const first = index === 0;
            return (
              <Pressable
                onPress={() =>
                  navigation.navigate('dashboard/books/detail', {
                    title: item.title,
                    key: item.key.replace('/works/', ''),
                  })
                }>
                <View
                  key={item.title}
                  style={[
                    SubjectsSectionItemStyle.bookContainer,
                    first && SubjectsSectionItemStyle.bookContainerFirst,
                  ]}>
                  <Text
                    numberOfLines={2}
                    style={SubjectsSectionItemStyle.bookTitle}>
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={SubjectsSectionItemStyle.bookAuthor}>
                    {item.author}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      <Pressable onPress={onPress}>
        <Text style={SubjectsSectionItemStyle.seeallText}>{'See All >'}</Text>
      </Pressable>
      <View style={SubjectsSectionItemStyle.spacer} />
      <View style={SubjectsSectionItemStyle.divider} />
      <View style={SubjectsSectionItemStyle.spacer} />
    </>
  );
};

const SubjectsSectionItemStyle = StyleSheet.create({
  subjectSection: {
    marginBottom: 20,
    marginHorizontal: -20,
  },
  subjectTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    marginHorizontal: 20,
  },
  bookTitle: {
    fontWeight: 'bold',
    color: 'white',
  },
  bookAuthor: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  bookContainer: {
    height: 180,
    width: 120,
    backgroundColor: 'grey',
    marginRight: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  bookContainerFirst: {
    marginLeft: 20,
  },
  spacer: {
    height: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#d7d7d7',
  },
  seeallText: {
    fontSize: 12,
  },
});

export default SubjectsSectionItem;
