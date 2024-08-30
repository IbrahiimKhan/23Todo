import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, SafeAreaView, StyleSheet} from 'react-native';
import TodoList from '../component/organism/NoteList';

const NoteScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <Button title="Add Note" onPress={() => navigation.navigate('AddNote')} />
      <TodoList />
    </SafeAreaView>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  SafeAreaView: {
    marginHorizontal: 20,
  },
});
