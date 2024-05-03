import React from 'react';
import { styles } from './ErrorMessages.css';

type ErrorMessagesProps = {
    messages: (string | null)[] | null;  // エラーメッセージをnull許容型で受け取る
};

const ErrorMessages: React.FC<ErrorMessagesProps> = ({ messages }) => {
    if (!messages || messages.length === 0) return null;  // エラーメッセージがnullまたは空の場合は何も表示しない

    return (
      <ol className="my-1">
        {messages.filter(message => message !== null).map(message => (
          <div className={styles.container} role="alert">
            <strong className={styles.error}>エラー！</strong>
            <span className={styles.message}>{message}</span>
          </div>
        ))}
      </ol>
    );
};

export default ErrorMessages;
