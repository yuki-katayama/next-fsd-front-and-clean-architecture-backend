import React from "react";
import { styles } from "./ErrorMessages.css";
import { useSelector } from "react-redux";
import { selectTodos } from "@/app/features/todo";

const ErrorMessages: React.FC = () => {
  const select = useSelector(selectTodos)

  return (
    <ol className="my-1">
      <div  className={styles.container} role="alert">
        <strong className={styles.error}>エラー！</strong>
        <span className={styles.message}>{select.error}</span>
      </div>
    </ol>
  );
};

export default ErrorMessages;
