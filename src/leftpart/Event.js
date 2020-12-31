import React, {useState, useEffect} from 'react';
import '../gantt.css'
import Item from './Item'

const currentDate = '2020/12/13'

function Event (props) {

    const addItem = (inputValue)=>{

      }
    const cleanItem = (itemIndex)=>{

    }
    const updateEvent = (itemIndex, newItem)=>{

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
