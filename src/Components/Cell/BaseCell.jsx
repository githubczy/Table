import React, { useState, useContext, useMemo } from 'react';
import { Input } from 'antd';
import classNames from 'classnames';
import { TableContext } from '../Context/index';
import { SELECTE_CELL, UNSELECT_CELL, UNSELECT_ALL_CELL } from '../Context/actionTypes';
import { FindItemIndex } from '../../utils/comm';

const BaseCell = ({ xIndex, yIndex, value, optionItem, onInputChange, onEditEnd, onInputBlur }) => {
    const tableConfig = useContext(TableContext);
    const { selectedRowIndex, selectedColIndex, selectedCellItems } = tableConfig.state;
    
    const className = useMemo(()=>classNames('cell-input', 
        {'cell-input-left': optionItem.align === 'left'}, 
        {'cell-input-center': optionItem.align === 'center'},
        {'cell-input-right': optionItem.align === 'right'},
        ),[optionItem]);

    const selectedItemIndex = FindItemIndex(selectedCellItems, (item)=> item.key===optionItem.key && item.index===xIndex);

    const selected = selectedRowIndex.includes(xIndex) || selectedColIndex.includes(yIndex) || (selectedItemIndex !== -1);
    
    const tableCellClass = useMemo(()=>classNames('table-cell', { 'table-cell-selected': selected }), [selected]);

    const onBaseCellDBClick = (e) => {
        if(!selected){
            tableConfig.dispatch({ type: SELECTE_CELL, selectedCell: { key:optionItem.key, index: xIndex }});
        }  
    }

    const onBaseCellClick = (e) => {
        if(selected){
            tableConfig.dispatch({ type: UNSELECT_CELL, selectedItemIndex });
        }
    }

    return(
        <div className={tableCellClass}
            onDoubleClick={onBaseCellDBClick}
            onClick={onBaseCellClick}
        >
            <Input
                className={className}
                value={value}
                onChange={onInputChange} 
                onPressEnter={onEditEnd} 
                onBlur={onInputBlur}
            />
        </div>
    );
}

export default BaseCell;
