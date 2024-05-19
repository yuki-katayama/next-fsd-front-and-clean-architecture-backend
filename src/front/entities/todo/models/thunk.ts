import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ICreateTodoDto,
  IUpdateTodoDto,
} from "@/backend/interface";
import {
  serverCreateTodo,
  serverDeleteTodo,
  serverFindAllTodo,
  serverFindTodo,
  serverUpdateTodo,
  ITodoResponseDto
} from "@/front/shared/api/todo";

// 共通の非同期処理実行関数
async function executeAsyncOperation<T>(
  operation: () => Promise<ITodoResponseDto>,
  rejectWithValue: Function
) {
  try {
    const response = await operation();
    if (response.error) {
      return rejectWithValue(response.error);
    }
    return response;
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : "An unknown error occurred"
    );
  }
}

export const createTodo = createAsyncThunk<ITodoResponseDto, ICreateTodoDto>(
  "todo/createTodo",
  async (form, { rejectWithValue }) => {
    const result = await executeAsyncOperation(
      () => serverCreateTodo(form),
      rejectWithValue
    );
    if (typeof result.payload === "string") {
      return rejectWithValue(result.payload);
    }
    return executeAsyncOperation(() => serverFindAllTodo(), rejectWithValue);
  }
);

export const updateTodo = createAsyncThunk<ITodoResponseDto, IUpdateTodoDto>(
  "todo/updateTodo",
  async (form, { rejectWithValue }) => {
    const result = await executeAsyncOperation(
      () => serverUpdateTodo(form),
      rejectWithValue
    );
    if (typeof result.payload === "string") {
      return rejectWithValue(result.payload);
    }
    return executeAsyncOperation(() => serverFindAllTodo(), rejectWithValue);
  }
);

export const deleteTodo = createAsyncThunk<ITodoResponseDto, string>(
  "todo/deleteTodo",
  async (id, { rejectWithValue }) => {
    const result = await executeAsyncOperation(
      () => serverDeleteTodo(id),
      rejectWithValue
    );
    if (typeof result.payload === "string") {
      return rejectWithValue(result.payload);
    }
    return executeAsyncOperation(() => serverFindAllTodo(), rejectWithValue);
  }
);

export const findTodo = createAsyncThunk<ITodoResponseDto, string>(
  "todo/findTodo",
  async (id, { rejectWithValue }) => {
    const result = await executeAsyncOperation(
      () => serverFindTodo(id),
      rejectWithValue
    );
    if (typeof result.payload === "string") {
      return rejectWithValue(result.payload);
    }
    return executeAsyncOperation(() => serverFindAllTodo(), rejectWithValue);
  }
);

export const findAllTodo = createAsyncThunk<ITodoResponseDto, void>(
  "todo/findAllTodo",
  (_, { rejectWithValue }) =>
    executeAsyncOperation(() => serverFindAllTodo(), rejectWithValue)
);
