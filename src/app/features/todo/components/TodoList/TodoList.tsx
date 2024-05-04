// components/TodoList.tsx
import React from "react";
import { ITodoResponseDtoAndError, deleteTodo, findTodo } from "../../actions.server";
import { styles } from "./TodoList.css";
import CRUDButton from "../common/CRUDButton/CRUDButton";
import { IUpdateTodoDto } from "@/interface";

interface TodoListProps {
  todos: ITodoResponseDtoAndError;
  setEditTodo: React.Dispatch<React.SetStateAction<IUpdateTodoDto>>;
  setTodos: React.Dispatch<React.SetStateAction<ITodoResponseDtoAndError>>;
  setIsEditTodo: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  setEditTodo,
  setTodos,
  setIsEditTodo,
}) => {
  const handleDelete = async (id: string) => {
    const todo = await deleteTodo(id);
    console.log(todo)
    setTodos({
      data: todo.data ? todos.data.filter((td) => td.id !== todo.data.id) : todos.data,
      error: todo.error
    });
  };

  const handleGet = async (id: string) => {
    const todo = await findTodo(id)
    setTodos({
      data: todos.data,
      error: todo.error
    });
    console.log("todo get complete ", todo)
  }

  return (
    <>
      {todos.data.map((td) => (
        <div key={td.id} className={styles.todoItem}>
          <div>
            <h3 className={styles.todoTitle}>{td.title}</h3>
            <p className={styles.todoDescription}>{td.description}</p>
          </div>
          <div className={styles.todoButtons}>
            <CRUDButton
              value="取得"
              action={() => {
                handleGet(td.id);
              }}
              customClass={styles.todoGetButton}
            />
            <CRUDButton
              value="編集"
              action={() => {
                setIsEditTodo(true);
                setEditTodo(td);
              }}
              customClass={styles.todoEditButton}
            />
            <CRUDButton
              value="削除"
              action={() => handleDelete(td.id)}
              customClass={styles.todoCloseButton}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default TodoList;
