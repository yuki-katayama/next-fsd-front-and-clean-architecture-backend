import React, { FormEvent, useRef } from "react";
import { styles } from "./TodoCreateForm.css";
import { useFormStatus } from "react-dom";
import { useAppDispatch } from "@/front/shared/lib/store";
import { createTodo } from "@/front/entities/todo";
import { SubmitButton, TodoFormInput } from "@/front/shared/ui/index"

interface TodoCreateFormProps {
}

const Submit = () => {
	const { pending } = useFormStatus()
	return <SubmitButton label="追加" type="submit" pending={pending} />
}

export const TodoCreateForm: React.FC<TodoCreateFormProps> = ({
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
		<TodoFormInput
			label="title"
			placeholder="タイトル"
			name="title"
			type="text"
		/>
		<TodoFormInput
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
