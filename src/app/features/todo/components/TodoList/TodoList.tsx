// components/TodoList.tsx
import React from "react";
import { styles } from "./TodoList.css";
import CRUDButton from "../common/CRUDButton/CRUDButton";
import { useSelector } from "react-redux";
import { deleteTodo, findAllTodo, findTodo, selectTodos, setEditTodo } from "../../slicer/slicer";
import { useAppDispatch } from "@/app/store";

interface TodoListProps {
}

const TodoList: React.FC<TodoListProps> = ({
}) => {
  const select = useSelector(selectTodos);
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
      {select.allTodo.map((td) => (
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
                dispatch(setEditTodo(td));
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