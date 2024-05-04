import { ITodoPresenterDto, IUpdateTodoDto } from "@/interface";

export type STATUS = 'idle' | 'pending' | 'succeeded' | 'failed';


export interface ITodoResponseDto {
	data: ITodoPresenterDto[] | ITodoPresenterDto | null
	error: string | null | string[]
}

export interface ITodoSlicer {
	allTodo: ITodoPresenterDto[]
	error: undefined | null | string | string[]
	status: STATUS
	editTodo: IUpdateTodoDto | null,
}

type a = keyof ITodoSlicer