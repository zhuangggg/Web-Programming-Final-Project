import React, { Component, useState, useEffect } from 'react'
import { Progress } from 'antd';
import { Pie } from '@ant-design/charts' ;     
import Piechart from './Piechart'
import './analysis.css'

function Analysis(props) {
    const [ave, setAve] = useState(0)
    const [count, setCount] = useState(0)
    const [value, setValue] = useState([])
    let add = 0
    let temp = []
    let data = []
    let userNames = props.project.usernames
    const events = props.project.events
    console.log(events);
    
    if(events){
        for(let i=0;i<events.length;i++){
            add += parseInt(events[i].progress)
            for(let j=0;j<events[i].items.length;j++){
                temp = [...temp, events[i].items[j]]
            }
        }
    }
    

    console.log(userNames)

    if(!count && events){
        for(let i=0;i<userNames.length;i++){
            for(let j=0;j<temp.length;j++){
                temp[j].progress = parseInt(temp[j].progress)
                for(let k=0;k<temp[j].usernames.length;k++){
                    if(userNames[i]===temp[j].usernames[k]){
                        let before = data[i] ? data[i].y : 0
                        data[i] = {
                            x: userNames[i],
                            y: temp[j].progress + before
                        }
                    }
                }
            }
        }
        setValue(data)
        setCount(1)
    }
    console.log("aaaaa");
    console.log(value);

    function pieStyle(_ref) {
        var user = _ref.x;
        console.log("vfvevfs");
        console.log(props.project.usernames);
        const index = props.project.usernames.findIndex(name=>name===user)%5
        let color = {fill:props.color[index]}
            console.log(color);
            return color
        }
        // if ( users[0]) {
        //   return { fill: 'p(a)https://gw.alipayobjects.com/zos/rmsportal/nASTPWDPJDMgkDRlAUmw.jpeg' };
        // }
        // return { fill: 'p(a)https://gw.alipayobjects.com/zos/rmsportal/ziMWHpHSTlTzURSzCarw.jpeg' };
    //   }

    return (
        <div className="content">
            <Progress
                width={150}
                strokeColor={props.color[2]}
                percent={events? Math.round(add/events.length):0}
            />
            {count?  <Piechart data={value} color={props.color} pieStyle={(_ref)=>pieStyle(_ref)} usernames={userNames}/>:<div></div>}
        </div>
    )
} 

export default Analysis