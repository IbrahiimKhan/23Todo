import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {addNote, editNote} from '../store/slice/noteSlice';
import {AppDispatch} from '../store/store';

export const AddNoteScreen = ({route}: any) => {
  const {task} = route.params;
  console.log('what is task', task);
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
    <View>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Task Title"
      />
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Task Content"
      />
      <Button title={task ? 'Edit' : 'Add'} onPress={handleAddOrEditTask} />
    </View>
  );
};

export default AddNoteScreen;

const styles = StyleSheet.create({});
