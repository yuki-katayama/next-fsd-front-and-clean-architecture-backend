"use client"

import React, { useEffect } from "react";
import { styles } from "./TodoHome.css";
import { ErrorMessages } from "@/front/shared/ui";
import { findAllTodo } from "@/front/entities/todo/models/thunk";
import { useAppDispatch, useAppSelector } from "@/front/shared/lib/store";
import { selectTodoError, selectTodoEdit, selectTodos } from "@/front/entities/todo";
import { TodoCreateForm } from "@/front/features/todo-create-form";
import { TodoEditForm } from "@/front/features/todo-edit-form/ui/TodoEditForm";
import { TodoList } from "@/front/widgets/todo-list";

export const TodoHome = () => {
  const dispatch = useAppDispatch()
  const error = useAppSelector(selectTodoError);
  const edit = useAppSelector(selectTodoEdit);
  const todos = useAppSelector(selectTodos)

  useEffect(() => {
    const loadTodos = async () => {
      await dispatch(findAllTodo());
    };
    loadTodos();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>タスク管理リスト</h1>
      { error != null && (
        <ErrorMessages message={error} />
      )}

      <TodoCreateForm />
      <TodoList todos={todos} />
      {edit && (
        <TodoEditForm />
      )}
    </div>
  );
};
