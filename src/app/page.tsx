"use client";

import { ICreateTodoDto, IGetTodoDto, TodoController } from "@/interface";
import React, { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { createTodo, findTodo } from "./actions";

const createTodoState: {
  error: null | string;
  data: null | ICreateTodoDto;
} = {
  error: null,
  data: null,
};

const Home = () => {
  const [todo, setTodo] = useState<{
    error: any;
    data: IGetTodoDto | null;
  } | null>({
    error: null,
    data: null,
  });
  const [todoTitle, setTodoTitle] = useState<string>();
  const [todoDescription, setTodoDescription] = useState<string>();
  const [state, action] = useFormState(createTodo, createTodoState);
  const reset = () => {
    setTodoTitle("");
    setTodoDescription("");
  };
  const onSubmit = (data: FormData) => {
    action(data);
    reset();
  };
  useEffect(() => {
    const main = async () => {
      const todo = await findTodo("e3664e09-abee-4e22-a701-d8f7a4c5b7f6");
      setTodo(todo);
      console.log(todo);
    };
    main();
  }, []);
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-xl font-bold text-center mb-4">タスク管理リスト</h1>
      <form action={onSubmit} className="mb-4">
        <div className="mb-3">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            タイトル
            <input
              type="text"
              name="todo-title"
              required
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
              className="mt-2 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            内容
            <input
              type="text"
              name="todo-description"
              required
              value={todoDescription}
              onChange={(e) => setTodoDescription(e.target.value)}
              className="mt-2 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          タスクを追加
        </button>
      </form>
      {state.data !== null && (
        <>
          <h2>createしたTodo</h2>
          <div>{state.data.id}</div>
          <div>{state.data.title}</div>
          <div>{state.data.description}</div>
        </>
      )}
      {state?.error}
      {todo !== null && todo.data !== null && (
        <>
          <h2>findしたTodo</h2>
          <div>{todo.data.id}</div>
          <div>{todo.data.title}</div>
          <div>{todo.data.description}</div>
        </>
      )}
      {todo?.error}
    </div>
  );
};

export default Home;
