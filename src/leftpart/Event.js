import React, {useState, useEffect} from 'react';
import '../gantt.css'
import Item from './Item'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { PROJECT_QUERY,
    CREATE_PROJECT_MUTATION, 
    CREATE_EVENT_MUTATION, 
    CREATE_ITEM_MUTATION,
    DELETE_PROJECT_MUTATION,
    DELETE_EVENT_MUTATION,
    DELETE_ITEM_MUTATION } from '../graphql'

function Event (props) {
    return(
      <>
        <li className="event" id={"event_"+props.eventIndex}>
          <div className="event_title">
            {props.clean? <button className="x" onClick={()=>{
              props.deleteEvent({
                variables:{
                  project_name: props.project_name,
                  event_name: props.event.name
                }
              })
            }}>x</button>:<div></div>}
            <div className="event_name">{props.event.name}</div>
            <div className="progress">{props.event.progress}</div>
          </div>
          <ul className="event_content">
            {props.event.items.map((item,itemIndex)=>
              <Item
                deleteItem={props.deleteItem}
                project_name={props.project_name}
                event_name={props.event.name}
                item={item}
                itemIndex={itemIndex}
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
              console.log(props.addItem)
              props.addItem({
                variables:{
                  project_name: props.project_name,
                  event_name: props.event.name,
                  item_name: input.value
                }
              }) 
              input.value = ""}}}/>
      </>
    )
}

export default Event;
