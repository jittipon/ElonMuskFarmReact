import {
    ADD_DURIAN,
    SHOW_ALL_DURIAN,
    UPDATE_DURIAN,
    DELETE_DURIAN
} from '../actions/type';

const initialState = [];

function durianReducer(durians = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ADD_DURIAN:
            return [...durians, payload];
        case SHOW_ALL_DURIAN:
            return payload;
        case UPDATE_DURIAN:
            return durians.map((durian) => {
                if (durian.id === payload.id) {
                    return {
                        ...durian,
                        ...payload,
                    };
                } else {
                    return durian;
                }
            });
        case DELETE_DURIAN:
            return durians.filter(({ id }) => id !== payload.id);
        default: 
            return durians;
    }
};

export default durianReducer;