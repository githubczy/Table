import React, { useState, useContext } from 'react';
import { TableContext } from '../Context/index';
import BaseCell from './BaseCell';
import { convertToFormatDate } from '../../utils/comm';

const DateCell = ({ xIndex, yIndex, data, optionItem }) => {
    const convertDate = convertToFormatDate(optionItem.format);
    let date = convertDate(data);
    if(date === 'Invalid date'){
        date = '--';
    }
    const [value, setValue] = useState(date);
    const onInputChange = (e) => {
        let format = convertDate(e.target.value)
        if(format !== 'Invalid date'){
            setValue(format);
        }
    };
    const tableConfig = useContext(TableContext);

    const onEditEnd = () => {
        tableConfig.dispatch({ type: 'CELL_EDIT', index: xIndex, key: optionItem.key, value: value});
    }

    const onInputBlur = () => {
        tableConfig.dispatch({ type: 'CELL_EDIT', index: xIndex, key: optionItem.key, value: value});
    }

    return(
        <BaseCell 
            xIndex={xIndex} 
            yIndex={yIndex} 
            value={value} 
            optionItem={optionItem}
            onInputChange={onInputChange}
            onEditEnd={onEditEnd}
            onInputBlur={onInputBlur}
        />
    );
}

export default DateCell;
