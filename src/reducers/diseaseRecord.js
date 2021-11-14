import {
    SHOW_RECORD_DISEASE, DELETE_RECORD_DISEASE
} from '../actions/type';

const initialState = [];

function diseaseRecordReducer(diseaseRecords = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SHOW_RECORD_DISEASE:
            return payload;
        case DELETE_RECORD_DISEASE:
            return diseaseRecords.filter(({ durian_id }) => durian_id !== payload.durian_id);
        default:
            return diseaseRecords;
    }
};

export default diseaseRecordReducer;