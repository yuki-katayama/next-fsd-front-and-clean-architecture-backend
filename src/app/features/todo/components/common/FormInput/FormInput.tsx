import React, { Dispatch, SetStateAction, InputHTMLAttributes } from 'react';
import { handleTodoChange } from '@/app/utils';
import { ICreateTodoDto, IUpdateTodoDto } from '@/interface';
import {styles} from './FormInput.css';  // CSS Module の利用

/**
 * typeがhiddenの場合のみlabelをnull
 */
interface Props<T> extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  customClassName?: string;
}

const FormInput = <T extends ICreateTodoDto | IUpdateTodoDto>({
  label,
  customClassName,
  ...props
}: Props<T>): JSX.Element => {
  return (
    <input
      {...props}
      className={`${styles.input} ${customClassName}`}
    />
  );
}

export default FormInput;
