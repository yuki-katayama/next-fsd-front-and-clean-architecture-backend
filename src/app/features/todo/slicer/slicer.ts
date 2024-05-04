import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { ICreateTodoDto, ITodoPresenterDto, IUpdateTodoDto } from '@/interface';
import { serverCreateTodo, serverDeleteTodo, serverFindAllTodo, serverFindTodo, serverUpdateTodo } from './slicer.server';
import { initialState } from '../types/constants';
import { ITodoResponseDto, ITodoSlicer } from '../types/models';

// 共通の非同期処理実行関数
async function executeAsyncOperation<T>(operation: () => Promise<ITodoResponseDto>, rejectWithValue: Function) {
  try {
    const response = await operation();
    if (response.error) {
      return rejectWithValue(response.error);
    }
    return response;
  } catch (err) {
    return rejectWithValue(err instanceof Error ? err.message : 'An unknown error occurred');
  }
}

export const createTodo = createAsyncThunk<ITodoResponseDto, ICreateTodoDto>(
  'todo/createTodo',
  async (form, { rejectWithValue }) => {
    const result = await executeAsyncOperation(() => serverCreateTodo(form), rejectWithValue)
    if (typeof result.payload === 'string') {
      return rejectWithValue(result.payload);
    }
    return executeAsyncOperation(() => serverFindAllTodo(), rejectWithValue)
  }
);

export const updateTodo = createAsyncThunk<ITodoResponseDto, IUpdateTodoDto>(
  'todo/updateTodo',
  async (form, { rejectWithValue }) => {
    const result = await executeAsyncOperation(() => serverUpdateTodo(form), rejectWithValue)
    if (typeof result.payload === 'string') {
      return rejectWithValue(result.payload);
    }
    return executeAsyncOperation(() => serverFindAllTodo(), rejectWithValue)
  }
)

export const deleteTodo = createAsyncThunk<ITodoResponseDto, string>(
  'todo/deleteTodo',
  async (id, { rejectWithValue }) => {
    const result = await executeAsyncOperation(() => serverDeleteTodo(id), rejectWithValue)
    if (typeof result.payload === 'string') {
      return rejectWithValue(result.payload);
    }
    return executeAsyncOperation(() => serverFindAllTodo(), rejectWithValue)
  }
)

export const findTodo = createAsyncThunk<ITodoResponseDto, string>(
  'todo/findTodo',
  async (id, { rejectWithValue }) => {
    const result = await executeAsyncOperation(() => serverFindTodo(id), rejectWithValue)
    if (typeof result.payload === 'string') {
      return rejectWithValue(result.payload);
    }
    return executeAsyncOperation(() => serverFindAllTodo(), rejectWithValue)
  }
)

export const findAllTodo = createAsyncThunk<ITodoResponseDto, void>(
  'todo/findAllTodo',
  (_, { rejectWithValue }) => executeAsyncOperation(() => serverFindAllTodo(), rejectWithValue)
)

// 状態更新の共通ロジック
const setPending = (state: ITodoSlicer) => {
  console.log("pending");
  state.status = 'pending';
  state.error = null
};

const setFulfilled = (state: ITodoSlicer, action: PayloadAction<{ data: ITodoPresenterDto[] | ITodoPresenterDto | null}>) => {
  console.log("succeeded");
  state["allTodo"] = action.payload.data as ITodoPresenterDto[];
  state.status = 'succeeded';
  state.error = null
};

const setRejected = (state: ITodoSlicer, action: any) => {
  console.log("failed");
  state.status = 'failed';
  state.error = action.payload;
};

export const todoSlice = createSlice({
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
export const selectTodos = (state: RootState) => state.todos;
export default todoSlice.reducer;
