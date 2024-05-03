"use client";

import {
  ICreateTodoDto,
  IGetTodoDto,
  IUpdateTodoDto,
} from "@/interface";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import {
  createTodo,
  findAllTodo,
  updateTodo,
} from "@/app/features/todo/actions";
import { styles } from "./style.css";
import ErrorMessages from "./components/elements/ErrorMessages/ErrorMessages";
import TodoList from "./features/todo/components/TodoList/TodoList";
import TodoEditForm from "./features/todo/components/TodoEditForm/TodoEditForm";
import TodoCreateForm from "./features/todo/components/TodoCreateForm/TodoCreateForm";

const initTodoActionState: {
  error: null | string;
  data: null | ICreateTodoDto | IUpdateTodoDto;
} = {
  error: null,
  data: null,
};

const initTodoState = {
  id: "",
  title: "",
  description: "",
};

const Home = () => {
  const [todos, setTodos] = useState<IGetTodoDto[]>([]);
  const [createTodoState, createTodoAction] = useFormState(
    createTodo,
    initTodoActionState
  );
  const [updateTodoState, updateTodoAction] = useFormState(
    updateTodo,
    initTodoActionState
  );
  const [editTodo, setEditTodo] = useState<IUpdateTodoDto>(initTodoState);
  const [isEditTodo, setIsEditTodo] = useState<boolean>(false);
	const [addTodo, setAddTodo] = useState<ICreateTodoDto>(initTodoState);

  const reset = () => {
    setAddTodo(initTodoState)
    setEditTodo(initTodoState)
    setIsEditTodo(false);
  };

  useEffect(() => {
    const loadTodos = async () => {
      const result = await findAllTodo();
      if (result.data) {
        setTodos(result.data);
      }
    };
    loadTodos();
  }, []);

  useEffect(() => {
    if (createTodoState.data) {
      setTodos([...todos, createTodoState.data as IGetTodoDto]);
    }
    reset();
  }, [createTodoState]);

  useEffect(() => {
    if (updateTodoState.data) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editTodo?.id ? updateTodoState.data : todo
      ) as IGetTodoDto[];
      setTodos(updatedTodos);
      reset()
    }
  }, [updateTodoState]);
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>タスク管理リスト</h1>
      <ErrorMessages
        messages={[createTodoState.error, updateTodoState.error]}
      />
      <TodoCreateForm
        createTodoAction={createTodoAction}
        setAddTodo={setAddTodo}
        addTodo={addTodo}
      />
      <TodoList
        todos={todos}
        setEditTodo={setEditTodo} // TODO: この辺りをreduxのstoreを使用していく
        setTodos={setTodos}
        setIsEditTodo={setIsEditTodo}
      />
      {isEditTodo && (
        <TodoEditForm
          updateTodoAction={updateTodoAction}
          setEditTodo={setEditTodo}
          setIsEditTodo={setIsEditTodo}
          editTodo={editTodo}
        />
      )}
    </div>
  );
};

export default Home;
