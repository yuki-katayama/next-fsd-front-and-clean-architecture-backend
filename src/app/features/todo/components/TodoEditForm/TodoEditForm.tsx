// components/TodoForm.tsx
import React, { FormEvent, useRef } from "react";
import { styles } from './TodoEditForm.css';
import { useFormStatus } from "react-dom";
import SubmitButton from "@/app/components/elements/SubmitButton/SubmitButton";
import FormInput from "../common/FormInput/FormInput";
import CRUDButton from "../common/CRUDButton/CRUDButton";
import { useAppDispatch } from "@/app/store";
import { findAllTodo, setEditTodo, selectTodos, updateTodo, setEditTodoTitle, setEditTodoDescription } from "../../slicer/slicer";
import { useSelector } from "react-redux";

interface TodoEditFormProps {
}

const Submit = () => {
	const { pending } = useFormStatus()
	return <SubmitButton label="更新" type="submit" pending={pending} />
}

const TodoEditForm: React.FC<TodoEditFormProps> = ({}) => {
	const formRef = useRef<HTMLFormElement>(null);
  const select = useSelector(selectTodos);
  const dispatch = useAppDispatch()
	const handleEdit = async (event: FormEvent) => {
		event.preventDefault();  // デフォルトのフォーム送信を防ぐ
		const target = event.target as typeof event.target & {
			id: { value: string };
			title: { value: string };
			description: { value: string };
		};
		const title = target.title.value;
		const description = target.description.value;
		const id = target.id.value;
		await dispatch(updateTodo({id: id, title, description}))
		await dispatch(findAllTodo())
		dispatch(setEditTodo(null))
		formRef.current?.reset();
	}
  return (
    <div className={styles.modalOverlay}>
      <form onSubmit={handleEdit} className={styles.modalContent}>
        <h2 className="text-lg">Todoを編集</h2>
        <FormInput
          required
          type="hidden"
          name="id"
          label="id"
          value={select.editTodo?.id}
          />
        <FormInput
          required
          label="title"
          type="text"
          name="title"
          placeholder="タイトル"
          customClassName={styles.modalInputTitle}
          value={select.editTodo?.title}
          onChange={(e) => dispatch(setEditTodoTitle(e.target.value))}
        />
        <FormInput
          required
          label="description"
          type="text"
          name="description"
          placeholder="内容"
          value={select.editTodo?.description}
          customClassName={styles.modalInputDesc}
          onChange={(e) => dispatch(setEditTodoDescription(e.target.value))}
        />
        <div className={styles.modalEditButtons}>
          <Submit />
          <CRUDButton
            value="閉じる"
            action={() => dispatch(setEditTodo(null))}
            customClass={styles.modalCloseButton}
          />
        </div>
      </form>
    </div>
  );
};

export default TodoEditForm;
