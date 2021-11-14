import {
    SAVE_TASK,
    SHOW_ALL_TASK,
    SHOW_SELECTED_TYPE,
    UPDATE_TASK,
    DELETE_TASK
} from '../actions/type';

const initialState = [];

function taskReducer(tasks = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SAVE_TASK: 
            return [...tasks, payload];
        case SHOW_ALL_TASK:
            return payload;
        case SHOW_SELECTED_TYPE:
            return payload;
        case UPDATE_TASK:
            return tasks.map((task) => {
                if (task.id === payload.id) {
                    return {
                        ...task,
                        ...payload,
                    };
                } else {
                    return task;
                }
            });
        case DELETE_TASK:
            return tasks.filter(({ id }) => id !== payload.id);
        
        default: 
            return tasks;
    }
};

export default taskReducer;
