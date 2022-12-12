import {ActionsTypeTasks, tasksReducer} from '../features/Todolists/tasks-reducer';
import {ActionsTypeToDoList, todolistsReducer} from '../features/Todolists/todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkDispatch} from "redux-thunk";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = ActionsTypeToDoList | ActionsTypeTasks
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionsType>;


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
