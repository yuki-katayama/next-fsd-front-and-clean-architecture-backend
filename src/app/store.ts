import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import todoReducer from "@/app/features/todo/slicer/slicer"
import { useDispatch } from "react-redux";

export const store = configureStore({
	reducer: {
		todos: todoReducer
	},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;