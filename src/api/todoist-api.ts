import axios from 'axios'

const settings = {
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '2ab039b3-0657-432a-993c-8a114bc9f9d4'
    },

}

export const instance = axios.create(settings)

export const todolistAPI = {
    updateTodolistTitle(idtodolist: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${idtodolist}`, {title})
    },
    createTodos(title: string) {
        return instance.post<ResponseType<{ item: ToDoListType }>>(`todo-lists`, {title})
    },
    deleteTodos(idtodolist: string) {
        return instance.delete<ResponseType>(`todo-lists/${idtodolist}`)
    },
    getTodos() {
        return instance.get<Array<ToDoListType>>(`todo-lists`)
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    addTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{items:TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title: title})
    },
    upDateTask(todolistId: string, taskId: string, payload: UpdateTaskType) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, {...payload})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}

// types
export type ToDoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type ResponseType<D = {}> = {
    data: D
    resultCode: number
    messages: Array<string>
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Complited = 2,
    Draft = 3
}
export enum TodoTaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponse = {
    items: Array<TaskType>
    totalCount: number
    error: string
}
export type UpdateTaskType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}