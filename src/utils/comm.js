import moment from 'moment';
import numeral from 'numeral';
/**
 * 查找数组元素的索引
 * @param {*} arr 
 * @param {*} action 
 */
const FindItemIndex = function(arr, action){
    if(typeof action !== 'function'){
        throw new Error('action must be function');
    }
    for(let i = 0, len = arr.length; i<len; i++){
        if(action(arr[i], i, arr) === true){
            return i;
        }
    }
    return -1;
}

/**
 * 格式化日期方法
 * @param {*} format 
 */
const convertToFormatDate = (format = 'YYYY-MM-DD') => {
    return (date) => {
        const value = moment(date).format(format);
        return value;
    }
}

/**
 * 字符转换数字
 * @param {*} num 
 */
const deFormatNumber = function(num){
    return numeral(num).value();
}

/**
 * 转换为格式化数字
 * @param {*} digits 
 */
const formatNumber = (digits = 0) => {
    let digitNum = digits > 0 ? '.' : '';
    for(let i = 0; i < digits; i++){
        digitNum = digitNum + '0';
    }
    return (num) => {
        const value = numeral(num).format(`0,0${digitNum}`);
        if(value){
            return value;
        }
        return '--';
    }
}

/**
 * 根据给定的索引执行数组的遍历方法
 * @param {*} arr 
 * @param {*} start 
 * @param {*} end 
 * @param {*} action 
 */
const ArrayForEach = (arr, start, end, action) => {
    if(typeof action !== 'function'){
        throw new Error('action must be function');
    }
    if(arr){
        if(start>-1 && end<=arr.length){
            for(let i=start; i<end; i++){
                action(arr[i], i);
            }
        }
    }
}

/**
 * 防抖方法
 * @param {*} fn 
 * @param {*} wait 
 */
const debounce = (fn,wait) => {
    var timer = null;
    return function(){
        if(timer !== null){
            clearTimeout(timer);
        }
        timer = setTimeout(fn,wait);
    }
}

export { 
    FindItemIndex,
    convertToFormatDate,
    deFormatNumber,
    formatNumber,
    ArrayForEach,
    debounce
};