import React, { Dispatch, SetStateAction, InputHTMLAttributes } from 'react';
import { handleTodoChange } from '@/app/utils';
import { ICreateTodoDto, IUpdateTodoDto } from '@/interface';
import {styles} from './FormInput.css';  // CSS Module の利用

type Action<T> = Dispatch<SetStateAction<T>>;

/**
 * typeがhiddenの場合のみlabelをnull
 */
interface Props<T> extends InputHTMLAttributes<HTMLInputElement> {
  action: Action<T>;
  todo: T;
  label?: keyof T;
  customClassName?: string;
}

const FormInput = <T extends ICreateTodoDto | IUpdateTodoDto>({
  action,
  todo,
  label,
  customClassName,
  ...props
}: Props<T>): JSX.Element => {
  return (
    <input
      {...props}
      value={(todo as any)[label]}
      onChange={(e) => handleTodoChange(action, label!, todo, e.target.value)}
      className={`${styles.input} ${customClassName}`}
    />
  );
}

export default FormInput;
