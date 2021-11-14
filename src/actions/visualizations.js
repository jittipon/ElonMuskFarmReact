import {
    SHOW_WATER_CHART,
    SHOW_ACCOUNT_BOOK,
    SHOW_SUM_INCOME_OUTCOME,
    ADD_ACCOUNT_BOOK,
    UPDATE_ACCOUNT_BOOK,
    DELETE_ACCOUNT_BOOK,
    SHOW_RECORD_DISEASE,
    DELETE_RECORD_DISEASE
} from './type';

import VisualizationDataService from '../services/visualization.service';

export const showWaterChart = () => async(dispatch) => {
    try {
        const res = await VisualizationDataService.showWaterChart();

        dispatch({
            type: SHOW_WATER_CHART,
            payload: res.data,
        })
    } catch (err) {
        console.log(err);
    }
};

export const showAccountBook = () => async (dispatch) => {
    try {
        const res = await VisualizationDataService.showAccountBook();

        dispatch({
            type: SHOW_ACCOUNT_BOOK,
            payload: res.data,
        })
    } catch (err) {
        console.log(err);
    }
};

export const addAccountBook = (type, title, description, total) => async (dispatch) => {
    try {
        const res = await VisualizationDataService.addAccountBook({ type, title, description, total });

        dispatch({
            type: ADD_ACCOUNT_BOOK,
            payload: res.data,
        })

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const updateAccountBook = (id, data) => async (dispatch) => {
    try {
        const res = await VisualizationDataService.updateAccountBook(id, data);

        dispatch({
            type: UPDATE_ACCOUNT_BOOK,
            payload: res.data
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteAccountBook = (id) => async (dispatch) => {
    try {
        const res = await VisualizationDataService.deleteAccountBook(id);

        dispatch({
            type: DELETE_ACCOUNT_BOOK,
            payload: { id }
        });
    } catch (err) {
        console.log(err);
    }
};

export const showSummaryIncomeOutcome = () => async (dispatch) => {
    try {
        const res = await VisualizationDataService.showSummaryIncomeOutcome();

        dispatch({
            type: SHOW_SUM_INCOME_OUTCOME,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const showRecordDisease = () => async (dispatch) => {
    try {
        const res = await VisualizationDataService.showRecordDisease();

        dispatch({
            type: SHOW_RECORD_DISEASE,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
};

export const deleteRecordDisease = (durian_id) => async (dispatch) => {
    try {
        const res = await VisualizationDataService.deleteDiseaseRecord(durian_id);

        dispatch({
            type: DELETE_RECORD_DISEASE,
            payload: { durian_id }
        });
    } catch (err) {
        console.log(err);
    }
};

export const showRecordofCurrentSeason = () => async(dispatch) => {
    try {
        const res = await VisualizationDataService.showRecordofCurrentSeason();

        dispatch({
            
        })
    } catch (err) {
        console.log(err);
    }
};