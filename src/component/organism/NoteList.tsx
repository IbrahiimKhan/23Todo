// components/NoteList.tsx
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
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
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.todos.tasks);

  useEffect(() => {
    dispatch(loadNotes());
  }, [dispatch]);

  const handleAddOrEditTask = () => {
    if (editingTask) {
      dispatch(editNote({id: editingTask, title, content}));
      setEditingTask(null);
    } else {
      dispatch(addNote({title, content}));
    }
    setTitle('');
    setContent('');
  };

  const handleEditTask = (task: {
    id: number;
    title: string;
    content: string;
  }) => {
    setTitle(task.title);
    setContent(task.content);
    setEditingTask(task.id);
  };

  return (
    <View>
      <FlatList
        data={tasks}
        renderItem={({item}) => (
          <TodoItem
            key={item.id}
            task={item}
            deleteTask={() => dispatch(deleteNote(item.id))}
            editTask={() => handleEditTask(item)}
          />
        )}
      />
    </View>
  );
}
