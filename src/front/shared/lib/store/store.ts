import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "@/front/entities/todo"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./types";

export const store = configureStore({
	reducer: {
		todos: todoReducer
	},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
