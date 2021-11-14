import {
    ADD_APPOINTMENT,
    SHOW_APPOINTMENT,
    UPDATE_APPOINTMENT,
    DELETE_APPOINTMENT,
    FIND_APPOINTMENT_BY_PRIORITY
} from './type';

import AppointmentDataService from '../services/appointment.service';

export const addNewAppointment = (title, description, datetime, priority, alert) => async (dispatch) => {
    try {
        const res = await AppointmentDataService.add({title, description, datetime, priority, alert});

        dispatch({
            type: ADD_APPOINTMENT,
            payload: res.data
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const showAppointment = () => async (dispatch) => {
    try {
        const res = await AppointmentDataService.show();

        dispatch({
            type: SHOW_APPOINTMENT,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
};

export const updateAppointment = (id, data) => async (dispatch) => {
    try {
        const res = await AppointmentDataService.update(id, data);

        dispatch({
            type: UPDATE_APPOINTMENT,
            payload: res.data
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteAppointment = (id) => async (dispatch) => {
    try {
        const res = await AppointmentDataService.delete(id);

        dispatch({
            type: DELETE_APPOINTMENT,
            payload: { id }
        });
    } catch (err) {
        console.log(err);
    }
};

export const findAppointmentByPriority = (priority) => async (dispatch) => {
    try {
        const res = await AppointmentDataService.findByPriority(priority);

        dispatch({
            type: FIND_APPOINTMENT_BY_PRIORITY,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
};