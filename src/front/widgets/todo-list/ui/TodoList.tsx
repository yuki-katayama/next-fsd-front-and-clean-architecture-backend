import React from "react";
import { styles } from "./TodoList.css";
import {
  ITodo,
} from "@/front/entities/todo";
import Todo from "./Todo";

interface TodoListProps {
  todos: ITodo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <>
      {todos.map((td) => (
        <div key={td.id} className={styles.todoItem}>
          <Todo todo={td}/>
        </div>
      ))}
    </>
  );
};
