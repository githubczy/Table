import React, { useReducer, useEffect } from 'react';
import ClipboardJS from 'clipboard';
import reducer from './reducer';
import TBody from '../Body/index';
import Header from '../Header/index';
import { FindItemIndex } from '../../utils/comm';
import './style.less';

const TableContext = React.createContext('tableConfig');

const Table =  ({ dataSource, columns, initialCurData, initialStart, initialEnd }) => {
    const initialState = {data:dataSource,options:columns, selectedRowIndex:[],selectedColIndex:[], selectedCellItems:[],start: initialStart,end:initialEnd ,curData:initialCurData};
    const [state, dispatch] = useReducer(reducer, initialState);
    
    useEffect(()=>{
        document.addEventListener("copy", onCopyClick);

        return ()=>{
            document.removeEventListener("copy", onCopyClick);
        }
    }, []);

    const {selectedRowIndex, selectedColIndex, selectedCellItems, data, options, curData } = state;
    const onCopyClick = (e) => {
        let copyTxt = '';
        if(selectedRowIndex.length > 0){
            copyTxt = handleRowSelected(selectedRowIndex);
        }
        if(selectedColIndex.length > 0){
            copyTxt = handleColSelected(selectedColIndex);
        }
        if(selectedCellItems.length > 0){
            copyTxt = handleCellSelected(selectedCellItems);
        }
        if(selectedRowIndex.length > 0 || selectedColIndex.length > 0 || selectedCellItems.length > 0){
            setCopyTxtToClipboard(copyTxt);
        }
    }

    const setCopyTxtToClipboard = (copyTxt) => {
        var btn = document.querySelector(".clipboard-btn");
        var clipboard = new ClipboardJS(btn);
        clipboard.on('success', (e)=>{
            console.log('success', '复制成功');
        });
        clipboard.on('error', (e)=>{
            console.log('error', '复制失败');
        });
        if(btn){
            btn.setAttribute('data-clipboard-text', copyTxt);
            btn.click();
        }
    }

    //当前选中的行数据进行处理
    const handleRowSelected = (selectedRowIndex) => {
        let copyTxt = '';
        options.forEach(item => {
            copyTxt += `${item.title}\t`;
        });
        copyTxt += '\n';
        const selectedIndex = selectedRowIndex.map(item => item).sort((a, b)=>a-b);
        selectedIndex.forEach(item => {
            let dataItem = data[item];
            options.forEach(opt => {
                copyTxt += `${dataItem[opt.key]} \t`;
            });
            copyTxt += '\n';
        });
        return copyTxt;
    }

    //当前选中的列数据进行处理
    const handleColSelected = (selectedColIndex) => {
        let copyTxt = '';
        const selectedIndex = selectedColIndex.map(item => item).sort((a, b)=>a-b);
        const selectedOptions = [options[0]];//序号
        selectedIndex.forEach(item => {
            selectedOptions.push(options[item]);
        });
        selectedOptions.forEach(item => {
            copyTxt += `${item.title}\t`;
        });
        copyTxt += '\n';
        curData.forEach(item => {
            selectedOptions.forEach(opt => {
                copyTxt += `${item.dataItem[opt.key]} \t`;
            });
            copyTxt += '\n';
        })
        return copyTxt;
    }

    //当前选中单元格数据处理
    const handleCellSelected = (selectedCellItems) => {
        let copyTxt = '';
        const selectedCell = selectedCellItems.map(item => item).sort((a, b) => a.index - b.index);
        const selectedOptions = [options[0]];//序号
        //选中的列
        options.forEach(item => {
            let dataIndex = FindItemIndex(selectedCell, cell => cell.key===item.key);
            if(dataIndex !== -1){
                selectedOptions.push(item);
            }
        });
        selectedOptions.forEach(item => {
            copyTxt += `${item.title}\t`;
        });
        copyTxt += '\n';
        const rowIndexOptionsMapper = {}; 
        selectedCell.forEach(item => {
            let cell = rowIndexOptionsMapper[item.index.toString()];
            if(cell === undefined){
                cell = rowIndexOptionsMapper[item.index.toString()] = [];
            }
            cell.push(item.key);
        });
        Object.keys(rowIndexOptionsMapper).forEach(index => {
            //保证列的顺序
            selectedOptions.forEach(opt => {
                if(opt.key === 'number'){
                    copyTxt += `${data[index][opt.key]}\t`;
                }else if(rowIndexOptionsMapper[index].includes(opt.key)){
                    copyTxt += `${data[index][opt.key]}\t`;
                }else{
                    copyTxt += '\t';
                }
            });
            copyTxt += '\n';
        });
        return copyTxt;
    }

    return(
        <TableContext.Provider value={{ state, dispatch }}>
            <div className="table-layout-main">
                <Header />
                <TBody />
            </div>
            <button style={{ display:'none'}} className="clipboard-btn" data-clipboard-text="" />
        </TableContext.Provider>
    );
}

const TableContainer = ({ dataSource, columns }) => {
    columns.unshift({ 
        title:'序号',
        key:'number',
        render: (text, record, index) => text,
        dataType: 'No',
        dataIndex: 'number',
        headerAlign: 'center',
        align: 'center'
    });

    const curData = [];
    let initialStart = 0, initialEnd = 20;
    if(initialEnd > dataSource.length){
        initialEnd = dataSource.length;
    }
    for(let i = initialStart; i<initialEnd;i++){
        curData.push({ dataItem: dataSource[i], index:i});
    }
    dataSource.forEach((item,index)=>{ item["number"]=index+1});
    return (<Table dataSource={dataSource} columns={columns} initialCurData={curData} initialStart={initialStart} initialEnd={initialEnd}/>);
}

export {
    TableContext,
    TableContainer
}
