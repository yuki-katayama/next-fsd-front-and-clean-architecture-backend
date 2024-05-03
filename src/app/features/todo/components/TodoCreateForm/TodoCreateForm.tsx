import React, { useState } from "react";
import PropTypes from "prop-types";
import { ICreateTodoDto } from "@/interface";
import { styles } from "./TodoCreateForm.css";
import { handleTodoChange } from "@/app/utils";
import { useFormState, useFormStatus } from "react-dom";
import SubmitButton from "@/app/components/elements/SubmitButton/SubmitButton";

interface TodoCreateFormProps {
  createTodoAction(payload: FormData): void;
  addTodo: ICreateTodoDto;
  setAddTodo: React.Dispatch<React.SetStateAction<ICreateTodoDto>>;
}

const Submit = () => {
	const { pending } = useFormStatus()
	return <SubmitButton label="追加" type="submit" pending={pending} />
}

const TodoCreateForm: React.FC<TodoCreateFormProps> = ({
  createTodoAction,
  addTodo,
  setAddTodo
}) => {
  return (
    <>
      <form action={createTodoAction} className={styles.form}>
        <input
          type="text"
          name="create-todo-title"
          placeholder="タイトル"
          value={addTodo?.title}
          onChange={(e) =>
            handleTodoChange(setAddTodo, "title", addTodo, e.target.value)
          }
          className={styles.input}
        />
        <input
          type="text"
          name="create-todo-description"
          placeholder="内容"
          value={addTodo?.description}
          onChange={(e) =>
            handleTodoChange(setAddTodo, "description", addTodo, e.target.value)
          }
          className={styles.input}
        />
        <Submit />
      </form>
    </>
  );
};

export default TodoCreateForm;
