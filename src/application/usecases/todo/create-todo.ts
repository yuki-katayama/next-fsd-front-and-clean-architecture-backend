import { ITodoRepository, TodoTitle, Todo, TodoId, TodoDescription } from "@/entity/todo";

export class CreateTodo {
	constructor(private readonly todoRepository: ITodoRepository) {}
	public execute(todo: Todo) {
		return this.todoRepository.create(todo)
	}
}
