export function TaskError(state = false, action) {
    switch (action.type){
        case "ERROR":
            return action.payload;
        default:
            return state
    }

}

export function TasksReducer(state = [], action) {
    switch (action.type){
        case "SET_TASKS":
            return action.payload;
        default:
            return state
    }
}

export function TasksFilterByStatus(state = {}, action) {
    switch (action.type){
        case "FILTER_TASKS":
            return action.payload;
        default:
            return state
    }
}

export function TasksFilterByUserName(state = '', action) {
    switch (action.type){
        case "FILTER_TASKS_BY_NAME":
            return action.payload;
        default:
            return state
    }
}