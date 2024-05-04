"use client";

import { revalidatePath } from "next/cache";
import {
  createTodo,
  findAllTodo,
  updateTodo,
} from "@/app/features/todo/actions.server";
import { ICreateTodoPresenter, IUpdateTodoPresenter } from "@/interface";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";

const initTodoActionState: {
  error: null | string;
  data: null | ICreateTodoPresenter | IUpdateTodoPresenter;
} = {
  error: null,
  data: null,
};

const Test = () => {
  // 2. Fetch additional todos
  const [todos, setTodos] = useState<ICreateTodoPresenter[]>([]);
  //   const todos = data.listTodos.items;
  const [createTodoState, createTodoAction] = useFormState(
    createTodo,
    initTodoActionState
  );
  useEffect(() => {
    const loadTodos = async () => {
      const result = await findAllTodo();
      if (result.data) {
        setTodos(result.data);
      }
    };
    loadTodos();
  }, []);

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <form action={createTodoAction}>
        <input name="create-todo-title" placeholder="Add a todo" />
        <input name="create-todo-description" placeholder="Add a todo" />
        <button type="submit">Add</button>
      </form>

      {(!todos || todos.length === 0) && (
        <div>
          <p>No todos, please add one.</p>
        </div>
      )}

      <ul>
        {todos.map((todo) => {
          return <li style={{ listStyle: "none" }}>{todo.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default Test;
