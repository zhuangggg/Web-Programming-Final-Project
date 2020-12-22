import React, {useState, useEffect} from 'react';
import '../gantt.css'
import Item from './Item'
const currentDate = '2020/12/13'


function Event (props) {
    const [eventData, setEventData] = useState("") 
    const [count, setCount] = useState(0)  

    
    const getEventData = ()=>{
        setEventData(props.event)
    }

    useEffect(() => {
        if(eventData=="") getEventData()
    })

    const sendToProps = ()=>{
      props.updateProject(eventData);
      setCount(count+1)

    }

    const addItem = (inputValue)=>{
        let temp = eventData
        temp.items.push({name: inputValue, progress: "0%", time: {start: currentDate, end: currentDate}})
        setEventData(temp)
        props.updateProject(eventData);
      }
    const cleanItem = (itemIndex)=>{
      let temp = eventData
      console.log('clean:', itemIndex)
      for(let i=itemIndex;i<temp.items.length-1;i++){
        temp.items[i] = temp.items[i+1]
      }
      console.log(temp.items);
      temp.items.pop()
      setEventData(temp)
      sendToProps()
    }
    const updateEvent = (itemIndex, newItem)=>{
        let temp = eventData
        eventData.items[itemIndex] = newItem
        setEventData(temp)
        sendToProps()
    }
      
    return(
      <>
        <li className="event" id={"event_"+props.eventIndex}>
          <div className="event_title">
            {props.clean? <button className="x" onClick={()=>props.cleanEvent(props.eventIndex)}>x</button>:<div></div>}
            <div className="event_name">{props.event.name}</div>
            <div className="progress">{props.event.progress}</div>
          </div>
          <ul className="event_content">
            {props.event.items.map((item,itemIndex)=>
              <Item
                item={item}
                itemIndex={itemIndex}
                updateEvent={updateEvent}                   
                cleanItem ={cleanItem} 
                clean={props.clean}/>)}
          </ul>
        </li>
        <input  className="add_item"
          id={props.eventIndex} 
          placeholder="+ Add item ..." 
          onKeyUp={(e)=>{  
            let key = window.event ? e.keyCode : e.which
            let input = document.getElementById(props.eventIndex)
            if(input.value!="" && key==13) {
              addItem(input.value) 
              input.value = ""}}}/>
      </>
    )
}

export default Event;
