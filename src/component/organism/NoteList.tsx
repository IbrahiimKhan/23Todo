/* eslint-disable react/no-unstable-nested-components */
// components/NoteList.tsx
import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addNote,
  deleteNote,
  editNote,
  loadNotes,
} from '../../store/slice/noteSlice';
import {AppDispatch, RootState} from '../../store/store';
import TodoItem from '../molecules/NoteItem';

export default function NoteList() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNote, setEditingNote] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.todos.tasks);

  useEffect(() => {
    dispatch(loadNotes());
  }, [dispatch]);

  const handleAddOrEditNote = () => {
    if (editingNote) {
      console.log('execute');
      dispatch(editNote({id: editingNote, title, content}));
      setEditingNote(null);
    } else {
      dispatch(addNote({title, content}));
    }
    setTitle('');
    setContent('');
  };

  const handleEditNote = (task: {
    id: number;
    title: string;
    content: string;
  }) => {
    setTitle(task.title);
    setContent(task.content);
    setEditingNote(task.id);
  };

  return (
    <View>
      <FlatList
        ListEmptyComponent={() => <Text>No Notes Found! Please Add one</Text>}
        data={tasks}
        renderItem={({item}) => (
          <TodoItem
            key={item.id}
            task={item}
            deleteNote={() => dispatch(deleteNote(item.id))}
            editNote={() => handleEditNote(item)}
          />
        )}
      />
    </View>
  );
}
