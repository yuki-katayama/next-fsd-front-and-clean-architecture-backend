import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from '@/app/store';
import { TodoController, IActionTodoDto } from '@/interface';
import { findAllTodo } from './actions';

export type TodosState = {
  data: IActionTodoDto[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | undefined;
};

// export const findAllTodo = createAsyncThunk<IActionTodoDto[], void, { state: RootState }>(
//   'todo/findAllTodo',
//   async (_, { rejectWithValue }) => {
//     try {
//       const todoController = new TodoController();
//     //   const response = await todoController.findAll();
//       return [];
//     } catch (err) {
//       return rejectWithValue(err instanceof Error ? err.message : 'An unknown error occurred');
//     }
//   }
// );

const initialState: TodosState = {
  data: [],
  status: 'idle',
  error: undefined,
};
// const todoController = new TodoController();

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(findAllTodo.pending, (state) => {
//         state.status = 'pending';
//       })
//       .addCase(findAllTodo.fulfilled, (state, action: PayloadAction<IActionTodoDto[]>) => {
//         state.data = action.payload;
//         state.status = 'succeeded';
//       })
//       .addCase(findAllTodo.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
});

export const selectTodos = (state: RootState) => state.todos;
export default todoSlice.reducer;
