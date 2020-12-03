import { ArrayForEach } from '../../utils/comm';

/**
 * 删除行
 * @param {*} state 
 * @param {*} action 
 */
export const deleteRow = (state, action) => {
    const { selectedRowIndex, data, curData, start, end }  = state;
    selectedRowIndex.sort((a, b) => a-b);
    let count = 0;
    selectedRowIndex.forEach(index => {
        index = index - count;
        data.splice(index, 1);
        count = count + 1;
    });
    selectedRowIndex.splice(0,selectedRowIndex.length);
    let len = data.length;
    curData.splice(0, curData.length);
    if(len === 0){
        state.start = 0;
        state.end = 0;
    }else{
        let tmpEnd = end, tmpStart = start;
        if(len <= start){
            tmpEnd = len;
            tmpStart = tmpEnd - 20;
            if(tmpStart < 0){
                tmpStart = 0;
            }
            state.start = tmpStart;
            state.end = tmpEnd;
        }else if(len < end){
            state.end = len;
        }
        ArrayForEach(data, tmpStart, tmpEnd, (item,index)=>{ curData.push({ dataItem: item, index})});
    } 
    return {data, ...curData, ...state};
}

/**
 * 删除列
 * @param {*} state 
 * @param {*} action 
 */
export const deleteCol = (state, action) => {
    const { selectedColIndex, options } = state;
    selectedColIndex.sort((a, b) => a-b);
    let count = 0;
    selectedColIndex.forEach(index => {
        index = index - count;
        options.splice(index, 1);
        count = count + 1;
    });
    selectedColIndex.splice(0, selectedColIndex.length);
    return { selectedColIndex, options, ...state };
}

/**
 * 编辑单元格
 * @param {*} state 
 * @param {*} action 
 */
export const editCell = (state, action) => {
    const { index, key, value } = action;
    if(!index || !key) return { ...state };
    if(!state.data) return { ...state };
    const newData = state.data;
    newData[index][key] = value;
    return { data: newData, ...state };
}

/**
 * 降序排序
 * @param {*} state 
 * @param {*} action 
 */
export const sortColDesc = (state, action) => {
    const { item } = action;
    const { key, dataType } = item;
    const { data, curData, start, end } = state;
    let sorter = null;
    if(typeof item.sorter === 'function'){
        sorter = item.sorter;
    }else if(dataType === 'number'){
        sorter = (a, b) => b[key] - a[key];
    }else if(dataType === 'string' || dataType === 'date'){
        sorter = (a, b) => b[key].localeCompare(a[key]);
    }
    data.sort(sorter);
    data.forEach((item,index)=>{ item["number"]=index+1});
    curData.splice(0, curData.length);
    ArrayForEach(data, start,end, (item, index)=>{ curData.push({ dataItem:item, index });});
    return { data, curData, ...state }
}

/**
 * 升序排序
 * @param {*} state 
 * @param {*} action 
 */
export const sortColAsc = (state, action) => {
    const { item } = action;
    const { key, dataType } = item;
    const { data, curData, start, end } = state;
    let sorter = null;
    if(typeof item.sorter === 'function'){
        sorter = item.sorter;
    }else if(dataType === 'number'){
        sorter = (a, b) => a[key] - b[key];
    }else if(dataType === 'string' || dataType === 'date'){
        sorter = (a, b) => a[key].localeCompare(b[key]);
    }
    data.sort(sorter);
    curData.splice(0, curData.length);
    data.forEach((item,index)=>{ item["number"]=index+1});
    ArrayForEach(data, start,end, (item, index)=>{ curData.push({ dataItem:item, index });});
    return { data, curData, ...state };
}

/**
 * 选中一行
 * @param {*} state 
 * @param {*} action 
 */
export const selectedRow = (state, action) => {
    const { selectedRowIndex, selectedColIndex, selectedCellItems } = state;
    selectedColIndex.splice(0, selectedColIndex.length);
    selectedCellItems.splice(0, selectedCellItems.length);
    const { index } = action;
    
    if(!selectedRowIndex.includes(index)){
        selectedRowIndex.push(index);
    }
    return { selectedRowIndex, selectedColIndex, selectedCellItems, ...state };
}

/**
 * 取消选中行
 * @param {*} state 
 * @param {*} action 
 */
export const unSelectedRow = (state, action) => {
    const { selectedRowIndex } = state;
    const { index } = action;
    const dataIndex = selectedRowIndex.indexOf(index);
    if(dataIndex === -1){
        return { ...state };
    }
    selectedRowIndex.splice(dataIndex, 1);
    return { selectedRowIndex, ...state };
}

/**
 * 选择列
 * @param {*} state 
 * @param {*} action 
 */
export const selectedCol = (state, action) => {
    const { selectedColIndex, selectedRowIndex, selectedCellItems } = state;
    selectedRowIndex.splice(0, selectedRowIndex.length);
    selectedCellItems.splice(0, selectedCellItems.length);
    const { index } = action;
    if(!selectedColIndex.includes(index)){
        selectedColIndex.push(index);
    }
    return { selectedColIndex, selectedRowIndex, selectedCellItems, ...state };
}

/**
 * 取消选择列
 * @param {*} state 
 * @param {*} action 
 */
export const unSelectedCol = (state, action) => {
    const { selectedColIndex } = state;
    const { index } = action;
    const dataIndex = selectedColIndex.indexOf(index);
    if(dataIndex === -1){
        return { ...state };
    }
    selectedColIndex.splice(dataIndex, 1);
    return { selectedColIndex, ...state };
}

/**
 *  取消选中所有行
 * @param {*} state 
 * @param {*} action 
 */
export const unSelectedAllRow = (state, action) => {
    const { selectedRowIndex } = state;
    selectedRowIndex.splice(0, selectedRowIndex.length);
    return { selectedRowIndex, ...state }
}

/**
 * 取消选中所有列
 * @param {*} state 
 * @param {*} action 
 */
export const unSelectedAllCol = (state, action) => {
    const { selectedColIndex } = state;
    selectedColIndex.splice(0, selectedColIndex.length);
    return { selectedColIndex, ...state };
}

/**
 * 选中或者取消选中单元格
 * @param {*} state 
 * @param {*} action 
 */
export const selectedCell = (state, action) => {
    const { selectedColIndex, selectedRowIndex, selectedCellItems } = state;
    selectedColIndex.splice(0, selectedColIndex.length);
    selectedRowIndex.splice(0, selectedRowIndex.length);
    const { selectedCell } = action;
    selectedCellItems.push(selectedCell);
    return { selectedColIndex, selectedRowIndex, selectedCellItems, ...state };
}

/**
 * 取消选中单元格
 * @param {*} state 
 * @param {*} action 
 */
export const unSelectedCell = (state, action) => {
    const { selectedCellItems } = state;
    const { selectedItemIndex } = action;
    selectedCellItems.splice(selectedItemIndex, 1);
    return { selectedCellItems, ...state };
}

/**
 * 取消选中所有单元格
 * @param {*} state 
 * @param {*} action 
 */
export const unSelectedAllCell = (state, action) => {
    const { selectedCellItems } = state;
    selectedCellItems.splice(0, selectedCellItems.length);
    return { selectedCellItems, ...state };
}

/**
 * 滚动到底部更新数据
 * @param {*} state 
 * @param {*} action 
 */
export const onScrollBottomUpdateData = (state, action) => {
    const { data, curData } = state;
    let tmpStart = state.start + 10;
    const len = data.length;
    if(tmpStart >= len){
        return { ...state };
    }
    let tmpEnd = state.end + 10;
    if(tmpEnd > len){
        tmpEnd = len;
        tmpStart = tmpEnd - 20;
    }
    curData.splice(0, curData.length);
    ArrayForEach(data, tmpStart,tmpEnd, (item, index)=>{ curData.push({ dataItem:item, index });});
    state.start = tmpStart;
    state.end = tmpEnd;
    return { curData, ...state };
}

/**
 * 滚动到顶部更新数据
 * @param {*} state 
 * @param {*} action 
 */
export const onScrollTopUpdateData = (state, action) => {
    const { data, curData } = state;
    let tmpEnd = state.end - 10;
    let tmpStart = state.start - 10;
    if(tmpStart < 0){
        tmpStart = 0;
        tmpEnd = 20;
    }
    if(tmpEnd <= 0){
        return { ...state };
    }
    curData.splice(0, curData.length);
    ArrayForEach(data, tmpStart,tmpEnd, (item, index)=>{ curData.push({ dataItem:item, index });});
    state.start = tmpStart;
    state.end = tmpEnd;
    return { curData, ...state };
}