import { ITodoRepository, Todo, TodoDescription, TodoId, TodoTitle } from "@/entity";
import * as mutations from '@/graphql/mutations';
import * as queries from '@/graphql/queries';
import {Todo as TodoGql} from "@/API"

export class TodoRepository implements ITodoRepository {
	constructor(private readonly amplifyClient: any) {}
	private mapToTodo(todo: TodoGql): Todo {
		return new Todo(new TodoId(todo.id), new TodoTitle(todo.title), new TodoDescription(todo.description))
	}
	public async find(id: TodoId): Promise<Todo> {
		try {
			const { data, errors } = await this.amplifyClient.graphql({
				query: queries.getTodo,
				variables: {
					id: id.value!,
				}
			})
			console.log("errors", errors, data);
			if (data.getTodo == null) {
				throw new Error("指定のTodoがありません")
			}
			return this.mapToTodo(data.getTodo!);
		} catch (err: any) {
			throw new Error(err.message)
		}
	}
	public async findAll(): Promise<Todo[]> {
		try {
			const  { data } = await this.amplifyClient.graphql({
				query: queries.listTodos
			})
			return data.listTodos.items.map((todo: TodoGql) => this.mapToTodo(todo));
		} catch (err: any) {
			throw new Error(err.errors.map((err: {message: string}) => err.message))
		}
	}
	public async create(newTodo: Todo): Promise<Todo> {
		const { data, errors } = await this.amplifyClient.graphql({
			query: mutations.createTodo,
			variables: {
				input: {
					title: newTodo.title,
					description: newTodo.description,
				}
			}
		})
		if (errors) {
			throw new Error("Error creating graphql")
		}
		return this.mapToTodo(data.createTodo)
	}
	public async delete(id: TodoId): Promise<Todo> {
		try {
			const { data, errors } = await this.amplifyClient.graphql({
				query: mutations.deleteTodo,
				variables: {
					input: {
						id: id.value!,
					}
				}
			})
			if (data.deleteTodo === null) {
				throw new Error("指定のTodoがありません")
			}
			return this.mapToTodo(data.deleteTodo);
		} catch (err: any) {
			throw new Error(err.message)
		}
	}
	public async update(newTodo: Todo): Promise<Todo> {
		try {
			const { data, errors } = await this.amplifyClient.graphql({
				query: mutations.updateTodo,
				variables: {
					input: {
						id: newTodo.id!,
						title: newTodo.title,
						description: newTodo.description
					}
				}
			})
			console.log("errors", errors, data);
			if (data.updateTodo === null) {
				throw new Error("指定のTodoがありません")
			}
			return this.mapToTodo(data.updateTodo);
		} catch (err: any) {
			throw new Error(err.message)
		}
	}
}

