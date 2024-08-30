import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addNote, editNote} from '../store/slice/noteSlice';
import {AppDispatch} from '../store/store';

export const AddNoteScreen = ({route}: any) => {
  const {task} = route.params || {};
  const navigation = useNavigation();
  const [title, setTitle] = useState(task ? task?.title : '');
  const [content, setContent] = useState(task ? task.content : '');
  const dispatch = useDispatch<AppDispatch>();
  const [errorMsg, seterrorMsg] = useState<string>('');

  const handleAddOrEditTask = () => {
    if (task) {
      dispatch(editNote({id: task.id, title, content}));
      navigation.navigate('Root');
    } else {
      if (!title) {
        seterrorMsg("title can't be empty");
        return;
      }
      if (!content) {
        seterrorMsg("content can't be empty");
        return;
      }
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

      {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
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
  errorMsg: {
    color: 'red',
    marginVertical: 10,
  },
});
