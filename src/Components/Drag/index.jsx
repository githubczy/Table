import React, { useState } from 'react';
import './style.less';

export default () => {

    const [width, setWidth] = useState(100);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const onDivMouseDown = (e) => {
        console.log('e', '鼠标按下');
        setIsMouseDown(true);
    }

    const onDivMouseUp = (e) => {
        console.log('e', '鼠标抬起');
        setIsMouseDown(false);
    }

    const onDivMouseMove = (e) => {
        console.log('e', '鼠标移动');
        console.log('x', e.clientX);
        if(isMouseDown){
            setWidth(e.clientX + 2);
        }
    }

    return(
        <React.Fragment>
            <div 
                style={{ width: `${width}px`}}
                className="drag-item-test"
                
                >可拖拽测试<span 
                    onMouseDown={onDivMouseDown}
                    onMouseMove={onDivMouseMove}
                    onMouseUp={onDivMouseUp}
                    className="split"/></div>
            <div className="drag-item-test">可拖拽测试</div>
        </React.Fragment>
    );
}