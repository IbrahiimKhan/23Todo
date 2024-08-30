import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addTask, editTask} from '../store/slice/noteSlice';
import {AppDispatch, RootState} from '../store/store';
import {useNavigation} from '@react-navigation/native';

export const AddNoteScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.todos.tasks);
  console.log(tasks);
  // const handleEditTask = (task: {
  //   id: number;
  //   title: string;
  //   content: string;
  // }) => {
  //   setTitle(task.title);
  //   setContent(task.content);
  //   setEditingTask(task.id);
  // };

  const handleAddOrEditTask = () => {
    if (editingTask) {
      dispatch(editTask({id: editingTask, title, content}));
      setEditingTask(null);
    } else {
      dispatch(addTask({title, content}));
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
      <Button
        title={editingTask ? 'Edit' : 'Add'}
        onPress={handleAddOrEditTask}
      />
    </View>
  );
};

export default AddNoteScreen;

const styles = StyleSheet.create({});
