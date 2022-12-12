import { todolistAPI, ToDoListType} from "../api/todoist-api";
import {Dispatch} from "redux";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolist:ToDoListType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

export type SetTodolistActionType = {
    type: 'SET-TODOLISTS',
    todolist: Array<ToDoListType>
}

export type ActionsTypeToDoList = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistActionType


const initialState: Array<TodoListDomainType> = []
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListDomainType = ToDoListType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsTypeToDoList): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist,
                filter: 'all'
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {

                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {

                todolist.filter = action.filter;
            }
            return [...state]
        }
        case "SET-TODOLISTS": {
            return action.todolist.map(tl => ({...tl, filter: `all`}))
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolist: ToDoListType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const setTodolistAC = (todolist: Array<ToDoListType>): SetTodolistActionType => {
    return {type: 'SET-TODOLISTS', todolist: todolist}
}

export const fetchTodoListsTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodos()
            .then((res) => {
                dispatch(setTodolistAC(res.data))
            })

    }
}
export const removeTodoListTC = (todolistId:string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodos(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC(todolistId))
            })

    }
}
export const addTodoListTC = (title:string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTodos(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            })

    }
}
export const changeTodoListTitleTC = (todolistId:string,title:string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodolistTitle(todolistId,title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(todolistId,title))
            })

    }
}
