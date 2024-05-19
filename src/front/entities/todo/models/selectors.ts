import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/front/shared/lib/store/types'
import { ITodoState } from './types'

const selectBase = createSelector(
    (state: RootState) => state,
     (state) => state.todos
)

export const selectTodos = createSelector(
    selectBase,
    (state: ITodoState) => state.allTodo
)
export const selectTodoStatus = createSelector(
    selectBase,
    (state: ITodoState) => state.status
)
export const selectTodoError = createSelector(
    selectBase,
    (state: ITodoState) => state.error
)
export const selectTodoEdit = createSelector(
    selectBase,
    (state: ITodoState) => state.editTodo
)
