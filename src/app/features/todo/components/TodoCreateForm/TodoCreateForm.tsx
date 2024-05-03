import React from "react";
import { ICreateTodoDto } from "@/interface";
import { styles } from "./TodoCreateForm.css";
import { useFormStatus } from "react-dom";
import SubmitButton from "@/app/components/elements/SubmitButton/SubmitButton";
import FormInput from "../common/FormInput/FormInput";

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
		<FormInput
			action={setAddTodo}
			todo={addTodo}
			label="title"
			placeholder="タイトル"
			name="create-todo-title"
			type="text"
		/>
		<FormInput
			action={setAddTodo}
			todo={addTodo}
			label="description"
			type="text"
			name="create-todo-description"
			placeholder="内容"
		/>
        <Submit />
      </form>
    </>
  );
};

export default TodoCreateForm;
