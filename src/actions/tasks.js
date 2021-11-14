import {
    SAVE_TASK,
    SHOW_ALL_TASK,
    SHOW_SELECTED_TYPE,
    UPDATE_TASK,
    DELETE_TASK
} from './type';

import TaskDataService from '../services/task.service';

export const saveTask = (type_of_task, water_time, fertilizer, disease, etc,durian_id, saveAll) => async (dispatch) => {
    try {
        const res = await TaskDataService.save({type_of_task, water_time, fertilizer, disease, etc, durian_id, saveAll});

        dispatch({
            type: SAVE_TASK,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const showAll = () => async (dispatch) => {
    try {
        const res = await TaskDataService.showAll();

        dispatch({
            type: SHOW_ALL_TASK,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const updateTask = (id, data) => async (dispatch) => {
    try {
        const res = await TaskDataService.update(id, data);

        dispatch({
            type: UPDATE_TASK,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteTask = (id) => async (dispatch) => {
    try {
        await TaskDataService.delete(id);

        dispatch({
            type: DELETE_TASK,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};

export const showSelectedType = (type_of_task) => async (dispatch) => {
    try {
        const res = await TaskDataService.showSelectedType(type_of_task);

        dispatch({
            type: SHOW_SELECTED_TYPE,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
};

