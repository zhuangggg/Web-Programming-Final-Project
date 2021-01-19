import React, {useState, useEffect} from 'react';
import '../gantt.css'
import Event from './Event'
import {Button} from 'antd'

function Project (props) {
  const [edit, setEdit] = useState(false)

  const editMode = ()=>{
    setEdit(!edit)
  }
  return(
    <>
    {(props.project!=="")?      
      <div className={"gantt_leftpart"}>
        <div className="project_title">
          <div className="project_name">{props.project.name}</div>
          {/* <div className="progress">{props.project.progress}</div> */}
          <Button className="btn_clean" onClick={editMode}>Edit</Button>
        </div>
        <ul className="project_content">
        {props.project.events.map((event, eventIndex)=>  
          <Event
            deleteEvent={props.deleteEvent}
            addItem={props.addItem}
            deleteItem={props.deleteItem}
            project_name = {props.project.name}
            event = {event}
            eventIndex = {eventIndex}
            edit = {edit}
            getEditEvent={props.getEditEvent}
            getEditItem={props.getEditItem}/>)}
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
