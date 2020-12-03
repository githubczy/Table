import React, { useMemo, useContext } from 'react';
import classnames from 'classnames';
import Cell from '../Cell/index';
import { TableContext } from '../Context/index';

const Row = ({ xIndex, dataItem }) => {
    const tableConfig = useContext(TableContext);
    const { options, selectedRowIndex } = tableConfig.state;
    const selected = selectedRowIndex.includes(xIndex);
    const rowIndexName = `table-row-${xIndex.toString()}`;
    const className = useMemo(()=>classnames('table-row', { rowIndexName: true}, { 'table-row-selected': selected}), [selected]);
    const keys = options.map(item => item.key);
    return( 
        <div className={className}> 
            {
                keys.map((item,yIndex) => <Cell 
                                            key={`${xIndex}_${yIndex}_${dataItem[item]}`} 
                                            dataKey={item} 
                                            optionItem={options[yIndex]} 
                                            xIndex={xIndex} 
                                            yIndex={yIndex} 
                                            data={dataItem[item]} 
                                         />)
            }
        </div>
    );
}

export default Row;
