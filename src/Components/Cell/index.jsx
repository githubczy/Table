import React from 'react';
import NumberCell from './NumberCell';
import DateCell from './DateCell';
import StringCell from './StringCell';
import NoCell from './NoCell';

const Cell = ({ xIndex, yIndex, data, optionItem }) => {
    if(optionItem.dataType === 'No'){
        return <NoCell index={xIndex} data={data} optionItem={optionItem} />
    }else if(optionItem.dataType === 'string'){
        return <StringCell xIndex={xIndex} yIndex={yIndex} data={data} optionItem={optionItem} />
    }else if(optionItem.dataType === 'number'){
        return <NumberCell xIndex={xIndex} yIndex={yIndex} data={data} optionItem={optionItem} />
    }else if(optionItem.dataType === 'date'){
        return <DateCell xIndex={xIndex} yIndex={yIndex} data={data} optionItem={optionItem} />
    }else{
        throw new Error("数据类型未知");
    }
}

export default Cell;

export {
    NumberCell,
    DateCell,
    StringCell,
    NoCell
}