import React, { useContext, useEffect, useRef }  from 'react';
import Row from '../Row/index';
import { TableContext } from '../Context/index';
import { ROW_DELETE, SCROLL_BOTTOM_UPDATE_DATA, SCROLL_TOP_UPDATE_DATA } from '../Context/actionTypes';
import { debounce } from '../../utils/comm';

const Body = ()=>{
    const tableConfig = useContext(TableContext);
    const { state } = tableConfig;
    const { curData, data } = state;
    const table = useRef();

    const onKeyPress = (e) => {
        if(e.keyCode === 100){
            //按D删除行
            tableConfig.dispatch({ type: ROW_DELETE });
        }
    }
    
    const onTableScroll = (e) => {
        if(table){
            const tBody = table.current;
            let divScrollTop = tBody.scrollTop,
                divClientHeight = tBody.clientHeight,
                divScrollHeight = tBody.scrollHeight;
            if(divScrollTop + divClientHeight >= divScrollHeight){
                if(curData[curData.length - 1].index !== data.length){
                    tBody.scrollTop = 50;
                    tableConfig.dispatch({ type: SCROLL_BOTTOM_UPDATE_DATA });
                }
            }
            if(divScrollTop === 0){
                if(curData[0].index !== 0){
                    tBody.scrollTop = 20;
                    tableConfig.dispatch({ type: SCROLL_TOP_UPDATE_DATA });
                }   
            }
        }
    }

    useEffect(()=>{
        if(table){
            table.current.onkeypress = onKeyPress;
            table.current.onscroll =  onTableScroll;
        }

        return ()=>{
            if(table){
                table.current.onkeypress = null;
                table.current.onscroll = null;
            }
        }
    },[]);

    return(
        <div ref={table} className="table-body" tabIndex={0}>
            {curData.map((item,index)=> <Row key={item.index} xIndex={item.index} dataItem={item.dataItem}/>)}
        </div>
    );
}

export default Body;