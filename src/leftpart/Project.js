import React, {useState, useEffect} from 'react';
import '../gantt.css'
import Event from './Event'
const currentDate = '2020/12/13'


function Project (props) {
  const [clean, setClean] = useState(false)



  const addEvent = (inputValue)=>{

  }

  const cleanEvent = (eventIndex)=>{

  }

  const updateProject = (eventIndex, newEvent)=>{
    
  }
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
            event = {event}
            updateProject = {updateProject}
            eventIndex = {eventIndex}
            cleanEvent = {cleanEvent}
            clean = {clean}/>)}
        </ul>
        <div className="add_event">
          <input id="add_event" 
            placeholder="+ Add event ..." 
            onKeyUp={(e)=>{
              let key = window.event ? e.keyCode : e.which
              let input = document.getElementById("add_event")
              if(input.value!="" && key==13) {
                addEvent(input.value) 
                input.value = ""
              }}}/>
        </div>
      </div>:<div></div>}
    </>
  )
}

export default Project;
