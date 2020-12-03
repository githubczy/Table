import React, { useContext } from 'react';
import { TableContext } from '../Context/index';
import { SELECT_ROW, UNSELECT_ROW } from '../Context/actionTypes';

const NoCell = ({ index, data }) => {
    const tableConfig = useContext(TableContext);
    //选中行
    const onRowDBClick = (e) => {
        tableConfig.dispatch({ type: SELECT_ROW, index: index });
    }

    //取消选中行
    const onRowClick = (e) => {
        tableConfig.dispatch({ type: UNSELECT_ROW, index: index });
    }

    return <div 
                className='table-cell table-cell-number'
                onDoubleClick={onRowDBClick} 
                onClick={onRowClick}
            >
                {data}
            </div>
}

export default NoCell;
