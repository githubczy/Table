import React, { useContext, useMemo, useEffect, useRef } from 'react';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { SORT_COL_DESC, SORT_COL_ASC, UNSELECT_COL, SELECT_COL, COL_DELETE } from '../Context/actionTypes';
import { TableContext } from '../Context/index';

const HeaderItem = ({ index, item }) => {
    const tableConfig = useContext(TableContext);
    const { dispatch, state } = tableConfig;
    const header = useRef();

    const onKeyPress = (e) => {
        if(e.keyCode === 100){
            dispatch({ type: COL_DELETE });
        }
    }

    useEffect(()=>{
        if(header){
            header.current.onkeypress = onKeyPress;
        }

        return ()=>{
            header.current.keypress = null;
        };
    }, []);


    const className = useMemo(()=>classnames('table-header-item-child', 
        {'table-head-item-number': item.key === 'number'},
        {'table-head-item-left': item.headerAlign === 'left'},
        {'table-head-item-center': item.headerAlign === 'center'},
        {'table-head-item-right': item.headerAlign === 'right'}), 
        [item]);

    const onUpOutlinedClick = ()=>{
        dispatch({ type:SORT_COL_ASC, item });
    }

    const onDownOutlinedClick = ()=>{
        dispatch({ type:SORT_COL_DESC, item });
    }

    const onColDBClick = () => {
        if(index === 0){
            return;
        }
        tableConfig.dispatch({ type: SELECT_COL, index });
    }

    const onColClick = () => {
        tableConfig.dispatch({ type: UNSELECT_COL, index });
    }

    const selected = state.selectedColIndex.includes(index);
    const headerItemClassName = useMemo(()=>classnames('table-head-item', { 'table-head-item-selected': selected }), [selected]);

    return (
        <div 
            ref={header}
            className={headerItemClassName}
            onDoubleClick={onColDBClick} 
            onClick={onColClick}
            tabIndex={0}
        >
            <div className={className}>
                <span>{item.title}</span>
                {
                    item.sorter ? 
                        <div className="header-item-sorter">
                            <CaretUpOutlined 
                                className="sort-up"
                                onClick={onUpOutlinedClick} 
                            />
                            <CaretDownOutlined
                                className="sort-down" 
                                onClick={onDownOutlinedClick} 
                            />
                        </div> : null
                }
            </div>
            
        </div>
    );
}


const Header = () => {
    const tableConfig = useContext(TableContext);
    const { options } = tableConfig.state;

    // const renderHeaders = (options) => {
    //     options.map((item, index) => {
    //         if(item.children){
    //             renderHeaders(item.children);
    //         }
    //         return();
    //     })
    // }

    return(
        <div className="table-header">
            <div className="table-row">
                {options.map((item,index) => <HeaderItem key={item.key} index={index} item={item}/>)}
            </div>
        </div>
    );
}

export default Header;