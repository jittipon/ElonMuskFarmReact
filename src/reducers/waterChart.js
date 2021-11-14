import {
    SHOW_WATER_CHART
} from '../actions/type';

const initialState = [];

function waterChartReducer(waterChart = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SHOW_WATER_CHART:
            return payload;
        default:
            return waterChart;
    }
};

export default waterChartReducer;