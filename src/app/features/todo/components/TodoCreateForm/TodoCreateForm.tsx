import React, { FormEvent, useRef } from "react";
import { styles } from "./TodoCreateForm.css";
import { useFormStatus } from "react-dom";
import SubmitButton from "@/app/components/elements/SubmitButton/SubmitButton";
import FormInput from "../common/FormInput/FormInput";
import { useAppDispatch } from "@/app/store";
import { createTodo } from "../../slicer/slicer";

interface TodoCreateFormProps {
}

const Submit = () => {
	const { pending } = useFormStatus()
	return <SubmitButton label="追加" type="submit" pending={pending} />
}

const TodoCreateForm: React.FC<TodoCreateFormProps> = ({
}) => {
	const formRef = useRef<HTMLFormElement>(null);
	const dispatch = useAppDispatch();
	const handleCreate = async (event: FormEvent) => {
		event.preventDefault();  // デフォルトのフォーム送信を防ぐ
		const target = event.target as typeof event.target & {
			title: { value: string };
			description: { value: string };
		};
		const title = target.title.value;
		const description = target.description.value;
		await dispatch(createTodo({id: null, title, description}))
		formRef.current?.reset();
	}
  return (
    <>
      <form ref={formRef} onSubmit={handleCreate} className={styles.form}>
		<FormInput
			label="title"
			placeholder="タイトル"
			name="title"
			type="text"
		/>
		<FormInput
			required
			label="description"
			type="text"
			name="description"
			placeholder="内容"
		/>
        <Submit />
      </form>
    </>
  );
};

export default TodoCreateForm;
