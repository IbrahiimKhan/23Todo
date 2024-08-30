import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import TodoList from '../component/organism/NoteList';

const NoteScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <Text style={styles.headerText}>Simple Note APP</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddNote')}>
        <Text style={styles.buttonText}>Add a new note</Text>
      </TouchableOpacity>
      <TodoList />
    </SafeAreaView>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  SafeAreaView: {
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: 'blue',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  headerText: {
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 20,
    textTransform: 'capitalize',
    color: 'black',
  },
});
