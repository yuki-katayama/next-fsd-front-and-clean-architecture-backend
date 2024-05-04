import { ITodoRepository, Todo, TodoId } from "@/entity";
import { ITodoPresenter, ITodoPresenterDto, TodoPresenter } from "@/interface";

export interface ITodoUsecase {
	find(id: TodoId): Promise<ITodoPresenterDto>
	findAll(): Promise<ITodoPresenterDto[]>
	create(newTodo: Todo): Promise<ITodoPresenterDto>
	delete(id: TodoId): Promise<ITodoPresenterDto>
	update(newTodo: Todo): Promise<ITodoPresenterDto>
}

export class TodoUsecase implements ITodoUsecase {
	constructor(
		private readonly todoRepository: ITodoRepository,
		private readonly todoPresenter: ITodoPresenter = new TodoPresenter()
	){}
	public async find(id: TodoId): Promise<ITodoPresenterDto> {
		const result = await this.todoRepository.find(id);
		return this.todoPresenter.todoToITodoPresenterDtoMapper(result)
	}
	public async findAll(): Promise<ITodoPresenterDto[]> {
		const result = await this.todoRepository.findAll();
		return this.todoPresenter.todoToITodoPresenterDtoArrayMapper(result)
	}
	public async create(newTodo: Todo): Promise<ITodoPresenterDto> {
		const result = await this.todoRepository.create(newTodo)
		return this.todoPresenter.todoToITodoPresenterDtoMapper(result)
	}
	public async delete(id: TodoId): Promise<ITodoPresenterDto> {
		const result = await this.todoRepository.delete(id)
		return this.todoPresenter.todoToITodoPresenterDtoMapper(result)
	}
	public async update(newTodo: Todo): Promise<ITodoPresenterDto> {
		const result = await this.todoRepository.update(newTodo)
		return this.todoPresenter.todoToITodoPresenterDtoMapper(result)
	}
}