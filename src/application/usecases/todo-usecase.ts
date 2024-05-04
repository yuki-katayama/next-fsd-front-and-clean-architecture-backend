import { ITodoRepository, Todo, TodoId } from "@/entity";

export interface ITodoUsecase {
	find(id: TodoId): Promise<Todo>
	findAll(): Promise<Todo[]>
	create(newTodo: Todo): Promise<Todo>
	delete(id: TodoId): Promise<Todo>
	update(newTodo: Todo): Promise<Todo>
}

export class TodoUsecase implements ITodoUsecase {
	constructor(private readonly todoRepository: ITodoRepository){}
	public async find(id: TodoId): Promise<Todo> {
		return await this.todoRepository.find(id);
	}
	public async findAll(): Promise<Todo[]> {
		return await this.todoRepository.findAll();
	}
	public async create(newTodo: Todo): Promise<Todo> {
		return this.todoRepository.create(newTodo)
	}
	public async delete(id: TodoId): Promise<Todo> {
		return this.todoRepository.delete(id)
	}
	public async update(newTodo: Todo): Promise<Todo> {
		return this.todoRepository.update(newTodo)
	}
}