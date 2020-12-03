import React, { useState, useEffect } from 'react';
import { TableContainer as Table } from '../Context/index';
import request from '../../utils/request';

export default () => {
    const [data, setData] = useState([]);
    const [options, setOptions] = useState([]);
    useEffect(()=>{
        request({url: 'http://localhost:9090/options'}).then(res => {
            setOptions(res);
        }).catch(er => {    
            console.log('er', er);
        });

        request({url:'http://localhost:9090/data'}).then(res => {
            setData(res);
        }).catch(er => {    
            console.log('er', er);
        });

    }, []);

    if(data.length > 0 && options.length > 0){
        return  <Table dataSource={data} columns={options}/>;
    } else {
        return <div>{"暂时无数据"}</div>
    }
}