import {
    ADD_APPOINTMENT,
    SHOW_APPOINTMENT,
    UPDATE_APPOINTMENT,
    DELETE_APPOINTMENT
} from '../actions/type';

const initialState = [];

function appointmentReducer(appointments = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_APPOINTMENT: 
            return [...appointments, payload];
        case SHOW_APPOINTMENT:
            return payload;
        case UPDATE_APPOINTMENT: 
            return appointments.map((appointment) => {
                if (appointment.id === payload.id) {
                    return {
                        ...appointment,
                        ...payload
                    };
                } else {
                    return appointment;
                }
            });
        case DELETE_APPOINTMENT: 
            return appointments.filter(({ id }) => id !== payload.id);
        default:
            return appointments;
    }
};

export default appointmentReducer;