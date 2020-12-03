import * as ActionTypes from './actionTypes'
import * as Actions from './actions';

const reducer = (state, action) => {
    switch(action.type){
        case ActionTypes.ROW_DELETE:
            return Actions.deleteRow(state, action);
        case ActionTypes.COL_DELETE:
            return Actions.deleteCol(state, action);
        case ActionTypes.CELL_EDIT:
            return Actions.editCell(state, action);
        case ActionTypes.SORT_COL_DESC:
            return Actions.sortColDesc(state, action);
        case ActionTypes.SORT_COL_ASC:
            return Actions.sortColAsc(state, action);
        case ActionTypes.SELECT_ROW:
            return Actions.selectedRow(state, action);
        case ActionTypes.UNSELECT_ROW:
            return Actions.unSelectedRow(state, action);
        case ActionTypes.SELECT_COL:
            return Actions.selectedCol(state, action);
        case ActionTypes.UNSELECT_COL:
            return Actions.unSelectedCol(state, action);
        case ActionTypes.UNSELECT_ALL_ROW:
            return Actions.unSelectedAllRow(state,action);
        case ActionTypes.UNSELECT_ALL_COL:
            return Actions.unSelectedAllCol(state, action);
        case ActionTypes.SELECTE_CELL:
            return Actions.selectedCell(state, action);
        case ActionTypes.UNSELECT_CELL:
            return Actions.unSelectedCell(state, action);
        case ActionTypes.UNSELECT_ALL_CELL:
            return Actions.unSelectedAllCell(state, action);
        case ActionTypes.SCROLL_BOTTOM_UPDATE_DATA:
            return Actions.onScrollBottomUpdateData(state, action);
        case ActionTypes.SCROLL_TOP_UPDATE_DATA:
            return Actions.onScrollTopUpdateData(state, action);
        default:
            throw new Error('操作类型不存在！');
    }
}

export default reducer;