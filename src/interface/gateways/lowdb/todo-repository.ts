import { ITodoRepository, Todo, TodoDescription, TodoId, TodoTitle } from "@/entity";
import { IDatabase, db } from "@/infrastructure";
import { randomUUID } from "crypto";
import { Low } from 'lowdb'

export class TodoRepository implements ITodoRepository {
	constructor(private readonly lowdb: Low<IDatabase> = db) {}
	public async find(id: TodoId): Promise<Todo> {
		return new Todo(new TodoId("id"), new TodoTitle("title"), new TodoDescription("description"))
	}
	public async findAll(): Promise<Todo[]> {
		return [new Todo(new TodoId("id"), new TodoTitle("title"), new TodoDescription("description"))]
	}
	public async create(todo: Todo): Promise<Todo> {
		const uuid: string = randomUUID()
		this.lowdb.data.todos.push({
			id: uuid,
			title: todo.title,
			description: todo.description
		})
		await this.lowdb.write()
		return new Todo(new TodoId(uuid), new TodoTitle(todo.title), new TodoDescription(todo.description))
	}
}

