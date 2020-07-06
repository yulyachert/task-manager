import axios from "axios";

export function tasksError(error) {
    return {
        type: 'ERROR',
        payload: error
    };
}

export function setTasks(tasks) {
    return {
        type: "SET_TASKS",
        payload: tasks
    }
}

export function filterTaskByStatus(status) {
    return {
        type: "FILTER_TASKS",
        payload: status
    }
}

export function filterTaskByUserName(name) {
    return {
        type: "FILTER_TASKS_BY_NAME",
        payload: name
    }
}

export function fetchTasks() {
    return dispatch => {
        axios.get('http://localhost:3000/api/tasks')
            .then((tasks) => {
                dispatch(setTasks(tasks.data));
            })
            .catch(() => tasksError(true));
    }
}

export function deleteTask(id) {
    return dispatch => {
        axios.delete(`http://localhost:3000/api/tasks/${id}`)
            .then(() => fetchTasks()(dispatch));
    }
}