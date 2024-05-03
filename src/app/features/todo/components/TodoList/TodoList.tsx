// components/TodoList.tsx
import React from "react";
import { deleteTodo } from "../../actions";
import { IGetTodoDto } from "@/interface"; // ToDoインターフェースをインポート
import { styles } from "./TodoList.css";
import CRUDButton from "../common/CRUDButton/CRUDButton";

interface TodoListProps {
  todos: IGetTodoDto[];
  setEditTodo: React.Dispatch<React.SetStateAction<IGetTodoDto>>;
  setTodos: React.Dispatch<React.SetStateAction<IGetTodoDto[]>>;
  setIsEditTodo: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  setEditTodo,
  setTodos,
  setIsEditTodo,
}) => {
  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id} className={styles.todoItem}>
          <div>
            <h3 className={styles.todoTitle}>{todo.title}</h3>
            <p className={styles.todoDescription}>{todo.description}</p>
          </div>
          <div>
            <CRUDButton
              value="編集"
              action={() => {
                setIsEditTodo(true);
                setEditTodo(todo);
              }}
              customClass={styles.todoEditButton}
            />
            <CRUDButton
              value="削除"
              action={() => handleDelete(todo.id)}
              customClass={styles.todoCloseButton}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default TodoList;
