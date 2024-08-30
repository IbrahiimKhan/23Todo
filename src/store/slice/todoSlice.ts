import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  tasks: Task[];
  loading: boolean;
}

const initialState: TodoState = {
  tasks: [],
  loading: false,
};

export const loadTasks = createAsyncThunk('todos/loadTasks', async () => {
  const tasks = await AsyncStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
});

const saveTasks = async (tasks: Task[]) => {
  await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask = {id: Date.now(), text: action.payload, completed: false};
      state.tasks.push(newTask);
      saveTasks(state.tasks);
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasks(state.tasks);
    },
    toggleCompleted: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasks(state.tasks);
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(loadTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
    });
    builder.addCase(loadTasks.pending, state => {
      state.loading = true;
    });
    builder.addCase(loadTasks.rejected, state => {
      state.loading = false;
    });
  },
});

export const {addTask, deleteTask, toggleCompleted} = todoSlice.actions;
export default todoSlice.reducer;
