import React, { Component, useState, useEffect } from 'react'
import { Progress } from 'antd';
import { Pie } from '@ant-design/charts' ;     


function Analysis(props) {
    const [ave, setAve] = useState(0)
    const [count, setCount] = useState(1)
    let add = 0
    let temp = []
    let data = []
    let userNames = props.project.usernames
    const events = props.project.events
    console.log(events);
    for(let i=0;i<events.length;i++){
        add += parseInt(events[i].progress)
        for(let j=0;j<events[i].items.length;j++){
            temp = [...temp, events[i].items[j]]
        }
    }

    console.log(userNames)

    if(!count){
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
        setCount(1)
    }

    let config = { 
        data ,
        meta : { 
          x : { 
            alias : '國家' , 
            range : [ 0 , 1 ] ,  
          } ,
          y : { 
            alias : '數量' , 
            formatter : ( v ) => {   
              return ` ${ v }個` ; 
            } ,
          } ,
        } ,
        angleField : 'x' , 
        colorField : 'y' , 
      } ;
    
    /*let config = { 
        data ,
        angleField : 'x', 
        colorField : 'y', 
      }*/
    console.log(data);

    const pie_style = {
    }
      const pie_color = {
        color: props.color
      }

    useEffect(() => {
        setAve(add/events.length)
    }, [add]);

    console.log(temp);

    return (
        <>
            <Progress
                type="circle"
                strokeColor={props.color}
                percent={ave}
            />
            {count?< Pie {...config} />:<div></div>}
        </>
    )
} 

export default Analysis