"use server";
import { TodoUsecase } from "@/application";
import { ICreateTodoDto, ITodoPresenterDto, IUpdateTodoDto, TodoController } from "@/interface";
import { Todo, TodoDescription, TodoId, TodoTitle } from "@/entity";
import { ITodoResponseDto } from "../types/models";

/**
 * DBを変更したい際は、下記二つのrepositoryとdbClientを変更すること。
 */
import { TodoRepository } from "@/interface/gateways/lowdb";
import { getDbClient } from "@/infrastructure/lowdb";

let todoController: TodoController | null = null;

const setController = async () => {
  const todoRepository = new TodoRepository(await getDbClient());
  const todoUsecase = new TodoUsecase(todoRepository);
  return new TodoController(todoUsecase);
};

const init = async () => {
  todoController = await setController();
};

init();

export const serverFindAllTodo = async (): Promise<ITodoResponseDto> => {
  try {
    // APIリクエストを想定
    todoController ||= await setController();
    const result = await todoController.findAll();
    return {
      error: null,
      data: result,
    };
  } catch (err: any) {
    if (Array.isArray(err.message)) {
      return {
        error: err.message.map(
          (message: { message: string }) => message.message
        ) as string[],
        data: [],
      };
    }
    return {
      error: err.message as string,
      data: [],
    };
  }
};

export const serverFindTodo = async (id: string): Promise<ITodoResponseDto> => {
  try {
    todoController ||= await setController();
    const todo: ITodoPresenterDto = await todoController.find(new TodoId(id));
    return {
      error: null,
      data: todo,
    };
  } catch (err: any) {
    return {
      error: err.message as string,
      data: null,
    };
  }
};

export const serverCreateTodo = async (formData: ICreateTodoDto): Promise<ITodoResponseDto> => {
  try {
    todoController ||= await setController();
    const todo = new Todo(
      new TodoId(null),
      new TodoTitle(formData.title),
      new TodoDescription(formData.description)
    );
    const result = await todoController.create(todo);
    return {
      error: null,
      data: result,
    };
  } catch (err: any) {
    return {
      error: err.message as string,
      data: null,
    };
  }
};

export const serverDeleteTodo = async (id: string): Promise<ITodoResponseDto> => {
  try {
    todoController ||= await setController();
    const result = await todoController.delete(new TodoId(id));
    return {
      error: null,
      data: result,
    };
  } catch (err: any) {
    return {
      error: err.message as string,
      data: null,
    };
  }
};

export const serverUpdateTodo = async (formData: IUpdateTodoDto): Promise<ITodoResponseDto> => {
  try {
    const todo = new Todo(
      new TodoId(formData.id),
      new TodoTitle(formData.title),
      new TodoDescription(formData.description)
    );
    todoController ||= await setController();
    const result = await todoController.update(todo);
    return {
      error: null,
      data: result,
    };
  } catch (err: any) {
    return {
      error: err.message as string,
      data: null,
    };
  }
};
