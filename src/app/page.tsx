"use client";

import { ICreateTodoDto, IGetTodoDto, IUpdateTodoDto, TodoController } from "@/interface";
import React, { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createTodo, deleteTodo, findAllTodo, findTodo, updateTodo } from "./actions";
import { styles } from "./style.css";
import { resetDb } from "@/infrastructure";
import ErrorMessages from "./components/elements/ErrorMessages";

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
}

const SubmitButton = (message: string) => {
  const { pending } = useFormStatus()
  console.log(pending);
  return <button type="submit" disabled={pending} className={styles.button} value={message}>タスクを追加</button>
}

const Home = () => {
  const [todos, setTodos] = useState<IGetTodoDto[]>([]);
  const [createTodoState, createTodoAction] = useFormState(createTodo, initTodoActionState);
  const [updateTodoState, updateTodoAction] = useFormState(updateTodo, initTodoActionState);
  const [editTodo, setEditTodo] = useState<IUpdateTodoDto | null>(null);
  const [addTodo, setAddTodo] = useState<ICreateTodoDto>(initTodoState);

  const reset = () => {
    setAddTodo(initTodoState)
    setEditTodo(null)
  };

  /**
   * 各プロパティの状態を変更する関数
   */
  const handleTodoChange = (
    setter: (value: React.SetStateAction<any>) => void,
    property: keyof IUpdateTodoDto | keyof ICreateTodoDto,
    todo: IUpdateTodoDto | ICreateTodoDto | null,
    value: string
  ) => {
    setter({
      ...todo,
      [property]: value  // 特定のプロパティを更新
    });
  }

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id)
    setTodos(todos.filter(todo => todo.id !== id))
  }

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
  }, [createTodoState])

  useEffect(() => {
    if (updateTodoState.data) {
      const updatedTodos = todos.map(todo => todo.id === editTodo?.id ? updateTodoState.data : todo) as IGetTodoDto[];
      setTodos(updatedTodos);
      setEditTodo(null);  // Close modal after update
    }
  }, [updateTodoState])
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>タスク管理リスト</h1>
      <ErrorMessages messages={[createTodoState.error, updateTodoState.error]} />
      <form action={createTodoAction} className={styles.form}>
        <input
          type="text"
          name="create-todo-title"
          placeholder="タイトル"
          value={addTodo?.title}
          onChange={(e) => handleTodoChange(setAddTodo, "title", addTodo, e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          name="create-todo-description"
          placeholder="内容"
          value={addTodo?.description}
          onChange={(e) => handleTodoChange(setAddTodo, "description", addTodo, e.target.value)}
          className={styles.input}
        />
        <SubmitButton />
      </form>

      <div>
        {todos.map(todo => (
          <div key={todo.id} className={styles.todoItem}>
            <div>
              <h3 className={styles.todoTitle}>{todo.title}</h3>
              <p className={styles.todoDescription}>{todo.description}</p>
            </div>
            <div>
              <button onClick={() => setEditTodo(todo)} className={styles.editButton}>編集</button>
              <button onClick={() => handleDeleteTodo(todo.id)} className={styles.deleteButton}>削除</button>
            </div>
          </div>
        ))}
      </div>
      {editTodo && (
        <div className={styles.modalOverlay}>
          <form action={updateTodoAction} className={styles.modalContent}>
            <h2 className="text-lg">Todoを編集</h2>
            <input type="hidden" name="update-todo-id" value={editTodo.id} required />
            <input
              required
              type="text"
              name="update-todo-title"
              value={editTodo.title}
              onChange={(e) => handleTodoChange(setEditTodo, "title", editTodo, e.target.value)}
              className={styles.modalInput}
            />
            <input
              required
              type="text"
              name="update-todo-description"
              value={editTodo.description}
              onChange={(e) => handleTodoChange(setEditTodo, "description", editTodo, e.target.value)}
              className={styles.modalInputDesc}
            />
            <button type="submit" className={styles.updateButton}>更新</button>
          </form>
          {editTodo.id}
        </div>
      )}
    </div>
  );
};

export default Home;