// components/TodoForm.tsx
import React from "react";
import { IUpdateTodoDto } from "@/interface"; // ToDoインターフェースをインポート
// import { createTodo, updateTodo } from '@/app/features/todo';
import { styles } from './TodoEditForm.css';
import { handleTodoChange } from "@/app/utils";
import { useFormStatus } from "react-dom";
import SubmitButton from "@/app/components/elements/SubmitButton/SubmitButton";

interface TodoEditFormProps {
  updateTodoAction (payload: FormData): void
  setEditTodo: React.Dispatch<React.SetStateAction<IUpdateTodoDto>>;
  editTodo: IUpdateTodoDto
}

const Submit = () => {
	const { pending } = useFormStatus()
	return <SubmitButton label="更新" type="submit" pending={pending} />
}

const TodoEditForm: React.FC<TodoEditFormProps> = ({
  updateTodoAction,
  setEditTodo,
  editTodo
}) => {
  // const [todo, setTodo] = useState<ICreateTodoDto>(editTodo || { title: '', description: '' });
  return (
    <div className={styles.modalOverlay}>
      <form action={updateTodoAction} className={styles.modalContent}>
        <h2 className="text-lg">Todoを編集</h2>
        <input
          required
          type="hidden"
          name="update-todo-id"
          value={editTodo.id}
        />
        <input
          required
          type="text"
          name="update-todo-title"
          value={editTodo.title}
          onChange={(e) =>
            handleTodoChange(setEditTodo, "title", editTodo, e.target.value)
          }
          className={styles.modalInput}
        />
        <input
          required
          type="text"
          name="update-todo-description"
          value={editTodo.description}
          onChange={(e) =>
            handleTodoChange(
              setEditTodo,
              "description",
              editTodo,
              e.target.value
            )
          }
          className={styles.modalInputDesc}
        />
        <Submit />
      </form>
    </div>
  );
};

export default TodoEditForm;
