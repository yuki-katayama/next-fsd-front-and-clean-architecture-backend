import React, { InputHTMLAttributes } from 'react';
import { ICreateTodoDto, IUpdateTodoDto } from '@/backend/interface';
import {styles} from './TodoFormInput.css';  // CSS Module の利用

/**
 * typeがhiddenの場合のみlabelをnull
 */
interface TodoFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  customClassName?: string;
}

export const TodoFormInput: React.FC<TodoFormInputProps> = ({
  label,
  customClassName,
  ...props
}) => {
  return (
    <input
      {...props}
      className={`${styles.input} ${customClassName}`}
    />
  );
}

