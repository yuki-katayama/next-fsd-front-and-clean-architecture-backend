import { ITodoPresenterDto } from "@/backend/interface";

export interface ITodoResponseDto {
	data: ITodoPresenterDto[] | ITodoPresenterDto | null
	error: string | null | string[]
}