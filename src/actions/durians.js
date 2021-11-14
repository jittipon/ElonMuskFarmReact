import {
    ADD_DURIAN,
    SHOW_ALL_DURIAN,
    UPDATE_DURIAN,
    DELETE_DURIAN,
} from './type';
import DurianDataService from '../services/durian.service';

export const addDurian = (durian_id, row, type) => async (dispatch) => {
    try {
        const res = await DurianDataService.add({durian_id, row, type});

        dispatch({
            type: ADD_DURIAN,
            payload: res.data
        })

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const showDurian = () => async (dispatch) => {
    try {
        const res = await DurianDataService.showAll();

        dispatch({
            type: SHOW_ALL_DURIAN,
            payload: res.data
        });
    }  catch (err) {
        console.log(err);
    }
};

export const updateDurian = (id, data) => async (dispatch) => {
    try {
        const res = await DurianDataService.update(id, data);

        dispatch({
            type: UPDATE_DURIAN,
            payload: res.data
        });
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteDurian = (id) => async (dispatch) => {
    try {
        const res = await DurianDataService.delete(id);

        dispatch({
            type: DELETE_DURIAN,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
};
