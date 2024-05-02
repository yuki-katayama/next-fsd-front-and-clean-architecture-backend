import { Todo, TodoId, ITodoRepository } from "@/entity/todo";

export class GetTodo {
	constructor(private readonly todoRePository: ITodoRepository){}
	public async execute(id: TodoId): Promise<Todo> {
		return await this.todoRePository.find(id);
	}
}