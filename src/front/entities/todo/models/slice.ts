import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/front/shared/lib/store/types';
import { ITodoPresenterDto, IUpdateTodoDto } from '@/backend/interface';
import { ITodoState } from './types';
import { createTodo, deleteTodo, findAllTodo, findTodo, updateTodo } from './thunk';
import { WritableDraft } from 'immer';

// 状態更新の共通ロジック
const setPending = (state: WritableDraft<ITodoState>) => {
  console.log("pending");
  state.status = 'pending';
  state.error = null
};

const setFulfilled = (state: WritableDraft<ITodoState>, action: PayloadAction<{ data: ITodoPresenterDto[] | ITodoPresenterDto | null}>) => {
  console.log("succeeded");
  state["allTodo"] = action.payload.data as ITodoPresenterDto[];
  state.status = 'succeeded';
  state.error = null
};

const setRejected = (state:  WritableDraft<ITodoState>, action: any) => {
  console.log("failed");
  state.status = 'failed';
  state.error = action.payload;
};

const initialState: ITodoState = {
  allTodo: [],
  editTodo: null,
  status: 'idle',
  error: null,
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setEditTodo: (state, action: {payload: IUpdateTodoDto | null}) => {
      state.editTodo = action.payload;
    },
    setEditTodoTitle: (state, action: PayloadAction<string>) => {
      if (state.editTodo) {
        state.editTodo.title = action.payload;
      }
    },
    setEditTodoDescription: (state, action: PayloadAction<string>) => {
      if (state.editTodo) {
        state.editTodo.description = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(findAllTodo.pending, setPending)
    .addCase(findAllTodo.fulfilled, (state, action) => setFulfilled(state, action))
    .addCase(findAllTodo.rejected, setRejected)
    .addCase(findTodo.pending, setPending)
    .addCase(findTodo.fulfilled, (state, action) => setFulfilled(state, action))
    .addCase(findTodo.rejected, setRejected)
    .addCase(createTodo.pending, setPending)
    .addCase(createTodo.fulfilled, (state, action) => setFulfilled(state, action))
    .addCase(createTodo.rejected, setRejected)
    .addCase(updateTodo.pending, setPending)
    .addCase(updateTodo.fulfilled, (state, action) => setFulfilled(state, action))
    .addCase(updateTodo.rejected, setRejected)
    .addCase(deleteTodo.pending, setPending)
    .addCase(deleteTodo.fulfilled, (state, action) => setFulfilled(state, action))
    .addCase(deleteTodo.rejected, setRejected)
  },
});

export const { setEditTodo, setEditTodoTitle, setEditTodoDescription} = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
