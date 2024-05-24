import React from "react";
import { styles } from "./ErrorMessages.css";

interface ErrorMessagesProps {
  message: string | string[];
}

export const ErrorMessages: React.FC<ErrorMessagesProps> = ({message}) => {
  return (
    <ol>
      <div  className={styles.container} role="alert">
        <strong className={styles.error}>エラー！</strong>
        <span className={styles.message}>{message}</span>
      </div>
    </ol>
  );
};

