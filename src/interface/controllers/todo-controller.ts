import { Todo, TodoId } from "@/entity";
import { ITodoPresenterDto } from "../presenters";
import { ITodoUsecase, TodoUsecase } from "@/application";

export class TodoController {
	constructor(
		private readonly todoUsecase: ITodoUsecase,
	) {}
	public async find(id: TodoId): Promise<ITodoPresenterDto>{
		id.nullValidate()
		return await this.todoUsecase.find(id)
	}
	public async findAll() {
		return this.todoUsecase.findAll()
	}
	public async create(todo: Todo): Promise<ITodoPresenterDto> {
		if (todo.id !== null) {
			throw new Error("既に存在するtodoです")
		}
		return await this.todoUsecase.create(todo)
	}
	public async delete(id: TodoId): Promise<ITodoPresenterDto> {
		id.nullValidate()
		return await this.todoUsecase.delete(id)
	}
	public async update(todo: Todo): Promise<ITodoPresenterDto> {
		todo.idObject.nullValidate();
		return await this.todoUsecase.update(todo)
	}
}