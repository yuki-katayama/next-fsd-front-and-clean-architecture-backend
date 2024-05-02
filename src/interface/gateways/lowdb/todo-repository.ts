import { ITodoRepository, Todo, TodoDescription, TodoId, TodoTitle } from "@/entity";
import { IDatabase, ITodoSchema, db } from "@/infrastructure";
import { randomUUID } from "crypto";
import { Low } from 'lowdb'

export class TodoRepository implements ITodoRepository {
	constructor(private readonly lowdb: Low<IDatabase> = db) {}
	private mapToTodo(todo: ITodoSchema): Todo {
		return new Todo(new TodoId(todo.id), new TodoTitle(todo.title), new TodoDescription(todo.description))
	}
	public async find(id: TodoId): Promise<Todo> {
		await this.lowdb.read();
		const todoSchema = db.data.todos.find(todo => todo.id === id.value);
		if (!todoSchema) {
			throw new Error("対象のTodoがありません")
		}
		return this.mapToTodo(todoSchema)
	}
	public async findAll(): Promise<Todo[]> {
		await this.lowdb.read();
		const todosSchema = this.lowdb.data.todos;
		if (todosSchema.length < 1) {
			throw new Error("Todoがありません")
		}
		return todosSchema.map((todoSchema: ITodoSchema) => this.mapToTodo(todoSchema));
	}
	public async create(newTodo: Todo): Promise<Todo> {
		const uuid: string = randomUUID()
		await db.update(data => data.todos.push({
			id: uuid,
			title: newTodo.title,
			description: newTodo.description
		}))
		return new Todo(new TodoId(uuid), new TodoTitle(newTodo.title), new TodoDescription(newTodo.description))
	}
	public async delete(id: TodoId): Promise<Todo> {
		const idx = db.data.todos.findIndex(todo => todo.id === id.value)
		if (idx === -1) {
			throw new Error("対象のTodoがありません")
		}
		const todoSchema = db.data.todos[idx]
		await db.update(({todos}) => todos.splice(idx, 1))
		return this.mapToTodo(todoSchema);
	}
	public async update(newTodo: Todo): Promise<Todo> {
		const idx = db.data.todos.findIndex(todo => todo.id === newTodo.id)
		if (idx === -1) {
			throw new Error("対象のTodoがありません")
		}
		const newTodoSchema: ITodoSchema = {
			id: newTodo.id as string,
			title: newTodo.title,
			description: newTodo.description,
		}
		await db.update(({todos}) => todos[idx] = newTodoSchema)
		return this.mapToTodo(newTodoSchema)
	}
}

