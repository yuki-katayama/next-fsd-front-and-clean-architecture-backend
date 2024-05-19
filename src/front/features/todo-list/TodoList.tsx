// components/TodoList.tsx
import React from "react";
import { styles } from "./TodoList.css";
import { deleteTodo, findAllTodo, findTodo, selectTodos, setEditTodo } from "@/front/entities/todo";
import { useAppDispatch, useAppSelector } from "@/front/shared/lib/store/index";
import { TodoUpdateButton } from "@/front/shared/ui";

interface TodoListProps {
}

export const TodoList: React.FC<TodoListProps> = ({
}) => {
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch()

  const handleDelete = async (id: string) => {
    await dispatch(deleteTodo(id));
		await dispatch(findAllTodo())
  };

  const handleGet = async (id: string) => {
    await dispatch(findTodo(id))
  }

  return (
    <>
      {todos.map((td) => (
        <div key={td.id} className={styles.todoItem}>
          <div>
            <h3 className={styles.todoTitle}>{td.title}</h3>
            <p className={styles.todoDescription}>{td.description}</p>
          </div>
          <div className={styles.todoButtons}>
            <TodoUpdateButton
              value="取得"
              action={() => {
                handleGet(td.id);
              }}
              customClass={styles.todoGetButton}
            />
            <TodoUpdateButton
              value="編集"
              action={() => {
                dispatch(setEditTodo(td));
              }}
              customClass={styles.todoEditButton}
            />
            <TodoUpdateButton
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
