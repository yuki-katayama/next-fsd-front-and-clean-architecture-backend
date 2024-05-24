import React, { ButtonHTMLAttributes } from 'react'
import { styles } from './TodoUpdateButton.css'
import { useAppDispatch } from '../../lib/store'
import { ITodo, deleteTodo, findAllTodo, findTodo, setEditTodo } from '@/front/entities/todo'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	value: string
	customClass: string
	actionType: "get" | "delete" | "update",
	todo: ITodo | null
}

export const TodoUpdateButton: React.FC<Props> = ({value, actionType, todo, customClass, ...props}) => {
	let action = () => {};
	const dispatch = useAppDispatch()

	const handleDelete = async () => {
	  	await dispatch(deleteTodo(todo!.id));
		await dispatch(findAllTodo())
	};
	const handleGet = async () => {
		await dispatch(findTodo(todo!.id))
	}
	const handleEdit = async () => {
		await dispatch(setEditTodo(todo))
	}
	switch(actionType) {
		case 'update':
		case null:
			action = handleEdit;
			break;
		case 'get':
			action = handleGet;
			break;
		case 'delete':
			action = handleDelete;
			break;
	}
  return (
    <button onClick={() => action()} className={`${styles.button} ${customClass}`} {...props}>{value}</button>
  )
}