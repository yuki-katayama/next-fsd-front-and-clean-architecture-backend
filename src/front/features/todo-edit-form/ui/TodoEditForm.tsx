// components/TodoForm.tsx
import React, { FormEvent, useRef } from "react";
import { styles } from './TodoEditForm.css';
import { useFormStatus } from "react-dom";
import { selectTodoEdit, findAllTodo, setEditTodo, selectTodos, updateTodo, setEditTodoTitle, setEditTodoDescription } from "@/front/entities/todo";
import { SubmitButton, TodoFormInput, TodoUpdateButton } from "@/front/shared/ui";
import { useAppDispatch, useAppSelector } from "@/front/shared/lib/store";

interface TodoEditFormProps {
}

const Submit = () => {
	const { pending } = useFormStatus()
	return <SubmitButton label="更新" type="submit" pending={pending} />
}

export const TodoEditForm: React.FC<TodoEditFormProps> = ({}) => {
	const formRef = useRef<HTMLFormElement>(null);
  const editTodo = useAppSelector(selectTodoEdit)
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
        <TodoFormInput
          required
          type="hidden"
          name="id"
          label="id"
          value={editTodo?.id ?? ''}
          />
        <TodoFormInput
          required
          label="title"
          type="text"
          name="title"
          placeholder="タイトル"
          customClassName={styles.modalInputTitle}
          value={editTodo?.title}
          onChange={(e) => dispatch(setEditTodoTitle(e.target.value))}
        />
        <TodoFormInput
          required
          label="description"
          type="text"
          name="description"
          placeholder="内容"
          value={editTodo?.description}
          customClassName={styles.modalInputDesc}
          onChange={(e) => dispatch(setEditTodoDescription(e.target.value))}
        />
        <div className={styles.modalEditButtons}>
          <Submit />
          <TodoUpdateButton
            value="閉じる"
            actionType="update"
            todo={null}
            customClass={styles.modalCloseButton}
          />
        </div>
      </form>
    </div>
  );
};
