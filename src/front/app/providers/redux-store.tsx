"use client"

import React from 'react'
import { Provider } from "react-redux";
import { store } from "@/front/shared/lib/store/index"

export const ReduxStore = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
