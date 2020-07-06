import {combineReducers} from 'redux';
import {TaskError, TasksFilterByStatus, TasksFilterByUserName, TasksReducer} from "./TasksReducers";


const allReducers = combineReducers({
    TaskError,
    TasksReducer,
    TasksFilterByStatus,
    TasksFilterByUserName
});

export default allReducers