import React from "react";
import { styles } from "./ErrorMessages.css";

type ErrorMessagesProps = {
  messages: (string | string[] | null)[]; // エラーメッセージをnull許容型で受け取る
};

const ErrorMessages: React.FC<ErrorMessagesProps> = ({ messages }) => {
  if (!messages || messages.length === 0) return null; // エラーメッセージがnullまたは空の場合は何も表示しない

  return (
    <ol className="my-1">
      {messages
        .filter((message) => message !== null) // nullでないメッセージをフィルター
        .map((message, index) => {
          // messageが配列の場合、それをカンマ区切りの文字列に変換
          const displayMessage = Array.isArray(message)
            ? message.join(", ")
            : message;

          return (
            <div key={index} className={styles.container} role="alert">
              <strong className={styles.error}>エラー！</strong>
              <span className={styles.message}>{displayMessage}</span>
            </div>
          );
        })}
    </ol>
  );
};

export default ErrorMessages;
