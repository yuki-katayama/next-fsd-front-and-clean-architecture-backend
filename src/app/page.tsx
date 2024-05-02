"use client";

import { ICreateTodoDto, IGetTodoDto, TodoController } from "@/interface";
import React, { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { createTodo, getTodo } from "./actions";

const createTodoState: {
  error: null | string;
  data: null | ICreateTodoDto;
} = {
  error: null,
  data: null,
};

const Home = () => {
  const [todo, setTodo] = useState<IGetTodoDto>();
  const [todoTitle, setTodoTitle] = useState<string>();
  const [todoDescription, setTodoDescription] = useState<string>();
  const [state, action] = useFormState(createTodo, createTodoState);
  const reset = () => {
    setTodoTitle("");
    setTodoDescription("");
  }
  const onSubmit = (data: FormData) => {
    action(data);
    reset()
  };
  useEffect(() => {
    const main = async () => {
      const todo = await getTodo();
      setTodo(todo);
    };
    main();
  }, []);
  return (
    <div>
      タスク管理リスト
      <form action={onSubmit}>
        <label
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          タイトル
          <input
            type="text"
            name="todo-title"
            required
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
          />
        </label>
        <label
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          内容
          <input
            type="text"
            name="todo-description"
            required
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
          />
        </label>
        <button type="submit">submit</button>
      </form>
      {state.data !== null && (
        <div className="">
          <br/>
          <br/>
          <div>{state.data.id}</div>
          <div>{state.data.title}</div>
          <div>{state.data.description}</div>
        </div>
      )}
      {state.error}
    </div>
  );
};

export default Home;
