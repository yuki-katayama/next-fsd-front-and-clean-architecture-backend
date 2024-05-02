import { ITodoRepository, Todo, TodoDescription, TodoId, TodoTitle } from "@/entity";
import { TodoRepository } from "../gateways";
import { ICreateTodoDto, ITodoDto, TodoDto } from "../presenters";
import { CreateTodo, GetTodo, GetTodoList } from "@/application";

export class TodoController {
	constructor(
		private readonly todoDto: ITodoDto = new TodoDto(),
		private readonly todoRepository: ITodoRepository = new TodoRepository()
	) {}
	public async get() {
		const id = "0";
		const todoId = new TodoId(id)
		todoId.nullValidate()
		const useCase = new GetTodo(this.todoRepository)
		const result = await useCase.execute(todoId)
		return this.todoDto.todoToIGetTodoDtoMapper(result)
	}
	public async getAll() {
		const useCase = new GetTodoList(this.todoRepository)
		const result = await useCase.execute()
		return this.todoDto.todosToIGetTodoDtoArrayMapper(result)
	}
	public async create(todo: Todo): Promise<ICreateTodoDto> {
		const useCase = new CreateTodo(this.todoRepository)
		const result = await useCase.execute(todo)
		return this.todoDto.todoToICreateTodoDtoMapper(result)
	}
}