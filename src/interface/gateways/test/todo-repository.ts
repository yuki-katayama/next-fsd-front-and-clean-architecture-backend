import { ITodoRepository, Todo, TodoDescription, TodoId, TodoTitle } from "@/entity";

export class TodoRepository {
	constructor() {}
	public async find(id: TodoId): Promise<Todo> {
		return new Todo(new TodoId("id"), new TodoTitle("title"), new TodoDescription("description"))
	}
	public async findAll(): Promise<Todo[]> {
		return [new Todo(new TodoId("id"), new TodoTitle("title"), new TodoDescription("description"))]
	}
	public async create(todo: Todo): Promise<Todo> {
		return new Todo(new TodoId(todo.id), new TodoTitle(todo.title), new TodoDescription(todo.description))
	}
}