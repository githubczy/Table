import React, { useState, useContext } from 'react';
import { TableContext } from '../Context/index';
import BaseCell from './BaseCell';

// const StringCell = ({ index, data, optionItem }) => {
//     const [value, setValue] = useState(data);
//     const onInputChange = (e) => {
//         setValue(e.target.value);
//     };
//     const tableConfig = useContext(TableContext);
//     const onEditEnd = () => {
//         tableConfig.dispatch({ type: 'CELL_EDIT', index: index, key: optionItem.key, value: value});
//     }

//     const onInputBlur = () => {
//         tableConfig.dispatch({ type: 'CELL_EDIT', index: index, key: optionItem.key, value: value});
//     }
//     const className = useMemo(()=>classNames('cell-input', 
//         {'cell-input-left': optionItem.align === 'left'}, 
//         {'cell-input-center': optionItem.align === 'center'},
//         {'cell-input-right': optionItem.align === 'right'},
//         ),[optionItem]);

//     return(
//         <div className='table-cell'>
//             <Input
//                 className={className}
//                 value={value}
//                 onChange={onInputChange} 
//                 onPressEnter={onEditEnd} 
//                 onBlur={onInputBlur}
//             />
//         </div>
//     );
// }

const StringCell = ({ xIndex, yIndex, data, optionItem }) => {
    const [value, setValue] = useState(data);
    const onInputChange = (e) => {
        setValue(e.target.value);
    };
    const tableConfig = useContext(TableContext);
    const onEditEnd = () => {
        tableConfig.dispatch({ type: 'CELL_EDIT', index: xIndex, key: optionItem.key, value: value});
    }

    const onInputBlur = () => {
        tableConfig.dispatch({ type: 'CELL_EDIT', index: xIndex, key: optionItem.key, value: value});
    }
    return (
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

export default StringCell;
