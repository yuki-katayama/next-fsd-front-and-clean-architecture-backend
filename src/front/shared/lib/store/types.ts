import { Action, ThunkAction } from "@reduxjs/toolkit";

export type AppDispatch = typeof import("./store").store.dispatch;
export type RootState = ReturnType<typeof import("./store").store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
