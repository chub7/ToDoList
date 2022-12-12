import React, {ChangeEvent, useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todoist-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    const getTodos = () => {
        todolistAPI.getTodos()
            .then(res => {
                setState(res.data)
            })
    }
    return <>
        <button onClick={getTodos}>Get Todos</button>
        <div>{JSON.stringify(state)}</div>
    </>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const createTodos = () => {
        todolistAPI.createTodos(`NewTodo`)
            .then(res => {
                setState(res.data)
            })
    }
    return <>
        <button onClick={createTodos}>Create Todos</button>
        <div>{JSON.stringify(state)}</div>
    </>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [idtodolist, setIdtodolist] = useState<any>(null)

    const deleteTodos = () => {
        todolistAPI.deleteTodos(idtodolist)
            .then(res => {
                setState(res.data)
            })
    }
    const onchangehandle = (e: ChangeEvent<HTMLInputElement>) => {
        setIdtodolist(e.currentTarget.value)
    }
    return <>
        <input onChange={onchangehandle}/>
        <button onClick={deleteTodos}>Delete TodoList</button>
        <div>{JSON.stringify(state)}</div>
    </>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [idtodolist, setIdtodolist] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)

    const UpdateTodolistTitle =() => {
        todolistAPI.updateTodolistTitle(idtodolist, title)
            .then(res => {
                setState(res.data)
            })
    }
    const onchangehandle = (e: ChangeEvent<HTMLInputElement>) => {
        setIdtodolist(e.currentTarget.value)
    }
    const onchangehandleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return <>
        <input placeholder={`ID`} onChange={onchangehandle}/>
        <input placeholder={`Title`} onChange={onchangehandleTitle}/>
        <button onClick={UpdateTodolistTitle}>UpdateTodolistTitle</button>
        <div>{JSON.stringify(state)}</div>
    </>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [idtodolist, setIdtodolist] = useState<any>(null)


    const getTasks = () => {
        todolistAPI.getTasks(idtodolist)
            .then(res => {
                setState(res.data)
            })
    }

    const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setIdtodolist(e.currentTarget.value)
    }
    return <>
        <input placeholder={`IDTodo`} onChange={onChangeHandle}/>
        <button onClick={getTasks}>GetTasks</button>
        <div>{JSON.stringify(state)}</div>
    </>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [idtodolist, setIdtodolist] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)

    const onChangeHandleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setIdtodolist(e.currentTarget.value)
    }
    const createTask = () => {
        todolistAPI.addTask(idtodolist,title)
            .then(res => {
                setState(res.data)
            })
    }
    return <>
        <input placeholder={`IDTodo`} onChange={onChangeHandle}/>
        <input placeholder={`Title task`} onChange={onChangeHandleTitle}/>
        <button onClick={createTask}>CreateTask</button>
        <div>{JSON.stringify(state)}</div>
    </>
}
export const UpdateTask = () =>{
    const [state, setState] = useState<any>(null)
    const [idtodolist, setIdtodolist] = useState<any>(null)
    const [idTask, setIdTask] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)

    let payload = {
        title: title,
        description: `test`,
        completed: false,
        status: 0,
        priority: 0,
        startDate: `2022-12-05T11:08:08.75`,
        deadline: `2022-12-05T11:08:08.75`
    }

    const onChangeHandleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onChangeHandleIdTodo = (e: ChangeEvent<HTMLInputElement>) => {
        setIdtodolist(e.currentTarget.value)
    }
    const onChangeHandleIdTask = (e: ChangeEvent<HTMLInputElement>) => {
        setIdTask(e.currentTarget.value)
    }
    const createTask = () => {
        todolistAPI.upDateTask(idtodolist,idTask,payload)
            .then(res => {
                setState(res.data)
            })
    }
    return <>
        <input placeholder={`IDTodo`} onChange={onChangeHandleIdTodo}/>
        <input placeholder={`IDTask`} onChange={onChangeHandleIdTask}/>
        <input placeholder={`Title task`} onChange={onChangeHandleTitle}/>
        <button onClick={createTask}>UpdateTask</button>
        <div>{JSON.stringify(state)}</div>
    </>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [idtodolist, setIdtodolist] = useState<any>(null)
    const [idTask, setIdTask] = useState<any>(null)

    const deleteTask = () => {
        todolistAPI.deleteTask(idtodolist,idTask)
            .then(res => {
                setState(res.data)
            })
    }
    const onChangeHandleIdTask = (e: ChangeEvent<HTMLInputElement>) => {
        setIdTask(e.currentTarget.value)
    }
    const onChangeHandleIdTodo = (e: ChangeEvent<HTMLInputElement>) => {
        setIdtodolist(e.currentTarget.value)
    }
    return <>
        <input placeholder={`IDTodo`} onChange={onChangeHandleIdTodo}/>
        <input placeholder={`IDTask`} onChange={onChangeHandleIdTask}/>
        <button onClick={deleteTask}>DeleteTask</button>
        <div>{JSON.stringify(state)}</div>
    </>
}