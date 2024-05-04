import { ICreateTodoDto, IUpdateTodoDto } from "@/interface";
import { ITodoResponseDto, ITodoSlicer } from "./models";

export const initialUpdateTodo: IUpdateTodoDto = {
	id: "",
	title: "",
	description: ""
}

export const initialCreateTodo: ICreateTodoDto = {
	id: null,
	title: "",
	description: ""
}

export const initialState : ITodoSlicer = {
	allTodo: [],
	error: null,
	status: "idle",
	editTodo: null,
};

export const initialResponseDto: ITodoResponseDto = {
	data: [],
	error: null
}