import React, {useState, useEffect} from 'react';
import '../gantt.css'
import Event from './Event'
const currentDate = '2020/12/13'


function Project (props) {
  const [clean, setClean] = useState(false)
  const [projectData, setProjectData] = useState("") 
  const [count, setCount] = useState(0)  

  const getProjectData = ()=>{
      setProjectData(props.project)
  }

  useEffect(() => {
      if(projectData == "") {
        getProjectData()
      }
  })

  const sendToProps = () => {
    props.updateData(projectData)
    setProjectData("")
    setCount(count+1)


  }

  const addEvent = (inputValue)=>{
    let temp = projectData
    temp.events.push({name: inputValue, progress: "0%", time: {start: currentDate, end: currentDate},items:[]})
    setProjectData(temp)
    sendToProps()
  }

  const cleanEvent = (eventIndex)=>{
    let temp = projectData
    for(let i=eventIndex;i<temp.events.length-1;i++){
      temp.events[i] = temp.events[i+1]
    }
    temp.events.pop()
    setProjectData(temp)
    sendToProps()
  }

  const updateProject = (eventIndex, newEvent)=>{
    let temp = projectData
    temp.events[eventIndex] = newEvent
    setProjectData(temp)
    sendToProps()
    
  }
  const cleanMode = ()=>{
    setClean(!clean)
  }
  return(
    <>
    {(projectData!=="")?      
      <div className="gantt_leftpart">
        <div className="project_title">
          <div className="project_name">{projectData.name}</div>
          <div className="progress">{projectData.progress}</div>
        </div>
        <button onClick={cleanMode}>clean</button>
        <ul className="project_content">
        {projectData.events.map((event, eventIndex)=>  
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
