import { combineReducers } from "redux";
import tasks from './tasks';
import durians from './durians';
import waterChart from './waterChart';
import accountBook from './accountBook';
import appointments from './appointments';
import diseaseRecord from './diseaseRecord';

export default combineReducers({
    tasks,
    durians,
    waterChart,
    accountBook,
    appointments,
    diseaseRecord,
});
