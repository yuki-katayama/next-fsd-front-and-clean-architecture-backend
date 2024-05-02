import { ITodoRepository, Todo, TodoId } from "@/entity";

export interface ITodoUsecase {
	getTodo(id: TodoId): Promise<Todo>
	getTodoList(): Promise<Todo[]>
	createTodo(newTodo: Todo): Promise<Todo>
	deleteTodo(id: TodoId): Promise<Todo>
	updateTodo(newTodo: Todo): Promise<Todo>
}

export class TodoUsecase implements ITodoUsecase {
	constructor(private readonly todoRepository: ITodoRepository){}
	public async getTodo(id: TodoId): Promise<Todo> {
		return await this.todoRepository.find(id);
	}
	public async getTodoList(): Promise<Todo[]> {
		return await this.todoRepository.findAll();
	}
	public async createTodo(newTodo: Todo): Promise<Todo> {
		return this.todoRepository.create(newTodo)
	}
	public async deleteTodo(id: TodoId): Promise<Todo> {
		return this.todoRepository.delete(id)
	}
	public async updateTodo(newTodo: Todo): Promise<Todo> {
		return this.todoRepository.update(newTodo)
	}
}