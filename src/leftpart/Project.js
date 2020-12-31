import React, {useState, useEffect} from 'react';
import '../gantt.css'
import Event from './Event'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { PROJECT_QUERY,
    CREATE_PROJECT_MUTATION, 
    CREATE_EVENT_MUTATION, 
    CREATE_ITEM_MUTATION,
    DELETE_PROJECT_MUTATION,
    DELETE_EVENT_MUTATION,
    DELETE_ITEM_MUTATION } from '../graphql'

function Project (props) {
  const [clean, setClean] = useState(false)

  const cleanMode = ()=>{
    setClean(!clean)
  }
  return(
    <>
    {(props.project!=="")?      
      <div className="gantt_leftpart">
        <div className="project_title">
          <div className="project_name">{props.project.name}</div>
          <div className="progress">{props.project.progress}</div>
        </div>
        <button onClick={cleanMode}>clean</button>
        <ul className="project_content">
        {props.project.events.map((event, eventIndex)=>  
          <Event
            deleteEvent={props.deleteEvent}
            addItem={props.addItem}
            deleteItem={props.deleteItem}
            project_name = {props.project.name}
            event = {event}
            eventIndex = {eventIndex}
            clean = {clean}/>)}
        </ul>
        <div className="add_event">
          <input id="add_event" 
            placeholder="+ Add event ..." 
            onKeyUp={(e)=>{
              let key = window.event ? e.keyCode : e.which
              let input = document.getElementById("add_event")
              if(input.value!="" && key==13) {
                props.addEvent({variables:{
                  project_name: props.project.name,
                  event_name: input.value
                }}) 
                input.value = ""
              }}}/>
        </div>
      </div>:<div></div>}
    </>
  )
}

export default Project;
