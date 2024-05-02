export interface IDatabase {
	todos: ITodoSchema[];
}

export interface ITodoSchema {
	id: string,
	title: string,
	description: string
}