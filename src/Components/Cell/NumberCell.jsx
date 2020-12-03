import React, { useState, useContext, useMemo } from 'react';
import { TableContext } from '../Context/index';
import BaseCell from './BaseCell';
import { deFormatNumber, formatNumber } from '../../utils/comm';

const NumberCell = ({ xIndex, yIndex, data, optionItem }) => {
    const convert = formatNumber(optionItem.digit ? optionItem.digit : 2);
    const [value, setValue] = useState(convert(data));
    const tableConfig = useContext(TableContext);

    const onInputChange = (e) => {
        let format = convert(e.target.value)
        if(format){
            setValue(format);
        }
    };

    const onEditEnd = () => {
        const num = deFormatNumber(value);
        if(!isNaN(num)){
            tableConfig.dispatch({ type: 'CELL_EDIT', index: xIndex, key: optionItem.key, value: num});
        }
    }

    const onInputBlur = () => {
        const num = deFormatNumber(value);
        if(!isNaN(num)){
            tableConfig.dispatch({ type: 'CELL_EDIT', index: xIndex, key: optionItem.key, value: num});
        }
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

export default NumberCell;
