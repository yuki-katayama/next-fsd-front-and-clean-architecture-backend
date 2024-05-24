import { ITodo } from "@/front/entities/todo";
import { TodoUpdateButton } from "@/front/shared/ui";
import React from "react";
import { styles } from "./TodoList.css";

interface Props {
	todo: ITodo
}

const Todo: React.FC<Props> = ({todo}) => {
  return (
    <>
      <div>
        <h3 className={styles.todoTitle}>{todo.title}</h3>
        <p className={styles.todoDescription}>{todo.description}</p>
      </div>
      <div className={styles.todoButtons}>
        <TodoUpdateButton
          todo={todo}
          value="取得"
          actionType="get"
          customClass={styles.todoGetButton}
        />
        <TodoUpdateButton
          todo={todo}
          value="編集"
          actionType="update"
          customClass={styles.todoEditButton}
        />
        <TodoUpdateButton
          todo={todo}
          value="削除"
          actionType="delete"
          customClass={styles.todoCloseButton}
        />
      </div>
    </>
  );
};

export default Todo;
