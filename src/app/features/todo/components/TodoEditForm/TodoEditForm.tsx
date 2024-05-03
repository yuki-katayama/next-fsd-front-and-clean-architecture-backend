// components/TodoForm.tsx
import React from "react";
import { IUpdateTodoDto } from "@/interface"; // ToDoインターフェースをインポート
// import { createTodo, updateTodo } from '@/app/features/todo';
import { styles } from './TodoEditForm.css';
import { handleTodoChange } from "@/app/utils";
import { useFormStatus } from "react-dom";
import SubmitButton from "@/app/components/elements/SubmitButton/SubmitButton";
import FormInput from "../common/FormInput/FormInput";
import CRUDButton from "../common/CRUDButton/CRUDButton";

interface TodoEditFormProps {
  updateTodoAction (payload: FormData): void
  setEditTodo: React.Dispatch<React.SetStateAction<IUpdateTodoDto>>;
  setIsEditTodo: React.Dispatch<React.SetStateAction<boolean>>;
  editTodo: IUpdateTodoDto
}

const Submit = () => {
	const { pending } = useFormStatus()
	return <SubmitButton label="更新" type="submit" pending={pending} />
}

const TodoEditForm: React.FC<TodoEditFormProps> = ({
  updateTodoAction,
  setEditTodo,
  setIsEditTodo,
  editTodo
}) => {
  return (
    <div className={styles.modalOverlay}>
      <form action={updateTodoAction} className={styles.modalContent}>
        <h2 className="text-lg">Todoを編集</h2>
        <FormInput
          required
          action={setEditTodo}
          todo={editTodo}
          type="hidden"
          name="update-todo-id"
          label="id"
          />
        <FormInput
          required
          action={setEditTodo}
          todo={editTodo}
          label="title"
          type="text"
          name="update-todo-title"
          placeholder="タイトル"
          customClassName={styles.modalInputTitle}
        />
        <FormInput
          required
          action={setEditTodo}
          todo={editTodo}
          label="description"
          type="text"
          name="update-todo-description"
          placeholder="内容"
          customClassName={styles.modalInputDesc}
        />
        <div className={styles.modalEditButtons}>
          <Submit />
          <CRUDButton
            value="閉じる"
            action={() => setIsEditTodo(false)}
            customClass={styles.modalCloseButton}
          />
        </div>
      </form>
    </div>
  );
};

export default TodoEditForm;
