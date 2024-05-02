import { Todo, TodoId, ITodoRepository } from "@/entity/todo";

export class GetTodoList {
	constructor(private readonly todoRePository: ITodoRepository){}
	public async execute(): Promise<Todo[]> {
		return await this.todoRePository.findAll();
	}
}