import React, {useCallback, useEffect} from 'react'
import './App.css';
import {Todolist} from '../features/Todolists/Todolist/Todolist';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Menu} from '@mui/icons-material';
import {
    addTodoListTC, changeTodolistFilterAC,
     changeTodoListTitleTC, fetchTodoListsTC, FilterValuesType,
    removeTodoListTC, TodoListDomainType
} from '../features/Todolists/todolists-reducer';
import {
    addTaskTC, updateTaskTC,
    removeTaskTC
} from '../features/Todolists/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType, TypedDispatch} from './store';
import {TaskType, TaskStatuses} from "../api/todoist-api";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
               <TodolistsList />
            </Container>
        </div>
    );
}

export default App;

const TodolistsList = () => {
    const todolists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch<TypedDispatch>();

    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTaskTC(todolistId, id))
    }, [dispatch]);
    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC(title, todolistId));
    }, [dispatch]);
    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        dispatch(updateTaskTC(id, {status}, todolistId));
    }, [dispatch]);
    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const action = updateTaskTC(id, {title: newTitle}, todolistId);
        dispatch(action);
    }, [dispatch]);
    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, [dispatch]);
    const removeTodolist = useCallback(function (id: string) {
        dispatch(removeTodoListTC(id));
    }, [dispatch]);
    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(changeTodoListTitleTC(id, title));
    }, [dispatch]);
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodoListTC(title));
    }, [dispatch]);
return (
    <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                id={tl.id}
                                title={tl.title}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
)
}