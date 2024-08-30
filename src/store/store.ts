import {configureStore} from '@reduxjs/toolkit';
import noteReducer from './slice/noteSlice';

const store = configureStore({
  reducer: {
    todos: noteReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
