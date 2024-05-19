import { Status } from "@/front/shared/types/apiStatus"
import { ErrorType } from "@/front/shared/types/errorType"

export interface ITodo {
    readonly id: string
    readonly title: string
    readonly description: string
}

export interface ICreateTodo {
    readonly id: string | null
    readonly title: string
    readonly description: string
}

export interface ITodoState {
    readonly allTodo: ITodo[]
	readonly editTodo: ITodo | null
	readonly status: Status
    readonly error: ErrorType
}

