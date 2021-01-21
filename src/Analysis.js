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
    console.log(data);

    return (
        <div className="content">
            <Progress
                width={150}
                strokeColor={props.color[2]}
                percent={events? add/events.length:0}
            />
            {count?  < Piechart data={value} color={props.color}/>:<div></div>}
        </div>
    )
} 

export default Analysis