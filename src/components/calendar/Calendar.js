import React from 'react';
import 'antd/dist/antd.css';
import { Calendar } from 'antd';


const CalendarCell = () => {

    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    }

    return (
        <div align="right">
            <Calendar onPanelChange={onPanelChange} style={{ backgroundColor: "lightcoral"}}/>
        </div>
    );
}

export default CalendarCell;

