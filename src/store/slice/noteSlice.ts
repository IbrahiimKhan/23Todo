import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Note {
  id: number;
  title: string;
  content: string;
}

interface NoteState {
  tasks: Note[];
  loading: boolean;
}

const initialState: NoteState = {
  tasks: [],
  loading: false,
};

export const loadNotes = createAsyncThunk('notes/loadNotes', async () => {
  const tasks = await AsyncStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
});

const saveNotes = async (tasks: Note[]) => {
  await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
};

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (
      state,
      action: PayloadAction<{title: string; content: string}>,
    ) => {
      const newNote = {id: Date.now(), ...action.payload};
      state.tasks.push(newNote);
      saveNotes(state.tasks);
    },
    deleteNote: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveNotes(state.tasks);
    },
    editNote: (
      state,
      action: PayloadAction<{id: number; title: string; content: string}>,
    ) => {
      const taskIndex = state.tasks.findIndex(
        task => task.id === action.payload.id,
      );
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = {...state.tasks[taskIndex], ...action.payload};
        saveNotes(state.tasks);
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(loadNotes.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
    });
    builder.addCase(loadNotes.pending, state => {
      state.loading = true;
    });
    builder.addCase(loadNotes.rejected, state => {
      state.loading = false;
    });
  },
});

export const {addNote, deleteNote, editNote} = noteSlice.actions;
export default noteSlice.reducer;
