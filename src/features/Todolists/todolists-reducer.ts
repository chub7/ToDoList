import {todolistAPI, ToDoListType} from "../../api/todoist-api";
import {Dispatch} from "redux";

const initialState: Array<TodoListDomainType> = []

export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsTypeToDoList): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "SET-TODOLISTS":
            return action.todolist.map(tl => ({...tl, filter: `all`}))
        default:
            return state;
    }
}
// actions
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (todolist: ToDoListType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const
}
export const setTodolistAC = (todolist: Array<ToDoListType>) => {
    return {type: 'SET-TODOLISTS', todolist} as const
}
// thunks
export const fetchTodoListsTC = () => (dispatch: Dispatch<ActionsTypeToDoList>) => {
    todolistAPI.getTodos()
        .then((res) => {
            dispatch(setTodolistAC(res.data))
        })
}
export const removeTodoListTC = (todolistId: string) => (dispatch: Dispatch<ActionsTypeToDoList>) => {
    todolistAPI.deleteTodos(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
        })
}
export const addTodoListTC = (title: string) => (dispatch: Dispatch<ActionsTypeToDoList>) => {
    todolistAPI.createTodos(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const changeTodoListTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsTypeToDoList>) => {
    todolistAPI.updateTodolistTitle(todolistId, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}

//types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistActionType = ReturnType<typeof setTodolistAC>

export type ActionsTypeToDoList = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistAC>

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListDomainType = ToDoListType & {
    filter: FilterValuesType
}