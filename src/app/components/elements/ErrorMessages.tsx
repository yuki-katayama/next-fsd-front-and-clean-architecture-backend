import React from 'react';

type ErrorMessagesProps = {
    messages: (string | null)[] | null;  // エラーメッセージをnull許容型で受け取る
};

const ErrorMessages: React.FC<ErrorMessagesProps> = ({ messages }) => {
    if (!messages || messages.length === 0) return null;  // エラーメッセージがnullまたは空の場合は何も表示しない

    return (
      <ol className="my-1">
        {messages.filter(message => message !== null).map(message => (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">エラー！</strong>
            <span className="block sm:inline">{message}</span>
          </div>
        ))}
      </ol>
    );
};

export default ErrorMessages;
