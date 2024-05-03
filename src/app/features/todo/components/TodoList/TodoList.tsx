// components/TodoList.tsx
import React from 'react';
import { deleteTodo } from '../../actions';
import { IGetTodoDto } from "@/interface"; // ToDoインターフェースをインポート
import { styles } from './TodoList.css';

interface TodoListProps {
  todos: IGetTodoDto[];
  setEditTodo: React.Dispatch<React.SetStateAction<IGetTodoDto>>;
  setTodos: React.Dispatch<React.SetStateAction<IGetTodoDto[]>>;
  setIsEditTodo: React.Dispatch<React.SetStateAction<boolean>>
}

const TodoList: React.FC<TodoListProps> = ({ todos, setEditTodo, setTodos, setIsEditTodo }) => {
  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <>
      {todos.map(todo => (
        <div key={todo.id} className={styles.todoItem}>
          <div>
            <h3 className={styles.todoTitle}>{todo.title}</h3>
            <p className={styles.todoDescription}>{todo.description}</p>
          </div>
          <div>
            <button onClick={() => {setIsEditTodo(true); setEditTodo(todo)}} className={styles.editButton}>編集</button>
            <button onClick={() => handleDelete(todo.id)} className={styles.deleteButton}>削除</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default TodoList;
