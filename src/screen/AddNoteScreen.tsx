import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {addNote, editNote} from '../store/slice/noteSlice';
import {AppDispatch} from '../store/store';

export const AddNoteScreen = ({route}: any) => {
  const {task} = route.params || {};
  const navigation = useNavigation();
  const [title, setTitle] = useState(task ? task?.title : '');
  const [content, setContent] = useState(task ? task.content : '');
  const dispatch = useDispatch<AppDispatch>();

  const handleAddOrEditTask = () => {
    if (task) {
      dispatch(editNote({id: task.id, title, content}));
      navigation.navigate('Root');
    } else {
      dispatch(addNote({title, content}));
      navigation.navigate('Root');
    }
    setTitle('');
    setContent('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Note</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Note Title"
      />
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="Note Content"
      />
      <Button title={task ? 'Edit' : 'Add'} onPress={handleAddOrEditTask} />
    </View>
  );
};

export default AddNoteScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    marginVertical: 10,
  },
  header: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
  },
});
