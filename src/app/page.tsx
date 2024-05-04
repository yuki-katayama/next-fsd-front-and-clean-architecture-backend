"use client"

import React, { useEffect } from "react";
import { styles } from "./style.css";
import ErrorMessages from "./components/elements/ErrorMessages/ErrorMessages";
import TodoList from "./features/todo/components/TodoList/TodoList";
import TodoEditForm from "./features/todo/components/TodoEditForm/TodoEditForm";
import TodoCreateForm from "./features/todo/components/TodoCreateForm/TodoCreateForm";
import { useSelector } from "react-redux";
import { findAllTodo, selectTodos } from "./features/todo/slicer/slicer";
import { useAppDispatch } from "./store";

const Home = () => {
  const dispatch = useAppDispatch()
  const select = useSelector(selectTodos);

  useEffect(() => {
    const loadTodos = async () => {
      await dispatch(findAllTodo());
    };
    loadTodos();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>タスク管理リスト</h1>
      { select.error != null && (
        <ErrorMessages />
      )}

      <TodoCreateForm />
      <TodoList />
      {select.editTodo && (
        <TodoEditForm />
      )}
    </div>
  );
};

export default Home;
