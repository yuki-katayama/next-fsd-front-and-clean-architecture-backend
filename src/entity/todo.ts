import { Id } from "./common";

export class InvalidProductTitleError extends Error {
	constructor(message: string){ super(message); };
}

export class InvalidProductDescriptionError extends Error {
	constructor(message: string){ super(message); };
}

export class TodoId extends Id {
	constructor(
		protected readonly _value: string | null
	) {
		super(_value)
	}
	get value() { return this._value; }
}

export class TodoTitle {
	constructor(protected readonly _value: string) {
		this.validate()
	  }
	  private validate() {
		  if (this.value.length < 1) {
			  throw new InvalidProductTitleError('1文字以上入力してください')
			}
		}
		get value() { return this._value; }
}

export class TodoDescription {
	constructor(protected readonly _value: string) {
		this.validate()
	  }
	  private validate() {
		  if (this.value.length < 1) {
			  throw new InvalidProductDescriptionError('1文字以上入力してください')
			}
		}
		get value() { return this._value; }
}

export class Todo {
	constructor(
		private _id: TodoId,
		private _title: TodoTitle,
		private _description: TodoDescription
	){}
	get id() { return this._id.value}
	get title() { return this._title.value}
	get description() { return this._description.value}
}

export interface ITodoRepository {
	findAll(): Promise<Todo[]>
	find(id: TodoId): Promise<Todo>
	create(todo: Todo): Promise<Todo>
	// fetch(): Promise<Todo | null>
	// update(todo: Todo): Promise<Todo>
	// delete(id: TodoId): Promise<void>
	// findByTitleOrFail(name: TodoTitle): Promise<Todo>
}