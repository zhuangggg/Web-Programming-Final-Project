import React, {useState, useEffect} from 'react';
import './gantt.css'
import axios from 'axios'
//let sample = require('./data.json');
const count = 0
const API_ROOT = 'http://localhost:4000/'
const instance = axios.create({
  baseURL: API_ROOT
})
const projectName = 'EECS Cornerstone'
const currentDate = '2020/12/13'

function Leftpart() {

  const [data, setData] = useState("") 
  const [completed, setCompleted] = useState(0)
  const [clean, setClean] = useState(false)

  const getProject = async() => {
    console.log('getProject')
    let msg =  await instance.post('/', {name: projectName})
    setData(msg.data)
    setCompleted(completed+1)
  }

  const updateProject = async()=>{
    let msg = await instance.post('/update', {name: projectName, data: data})
  }

  useEffect(() => {
    if (!completed)
      getProject()
  })

  const addEvent = (inputValue)=>{
    console.log("addEvent: ", inputValue)
    let temp = data
    temp.events.push({name: inputValue, progress: "0%", time: {start: currentDate, end: currentDate},items:[]})
    setData(temp)
    setCompleted(completed+1)
    updateProject();
  }
  
  const addItem = (eventNum, inputValue)=>{
    console.log("addItem: ", eventNum, inputValue)
    let temp = data
    temp.events[eventNum].items.push({name: inputValue, progress: "0%", time: {start: currentDate, end: currentDate}})
    setData(temp)
    setCompleted(completed+1)
    updateProject();
  }

  const cleanMode = ()=>{
    setClean(!clean)
  }

  
  return (
    <>
    {completed ?
      <div className="gantt_leftpart">
        <div className="project_title">
          <div className="project_name">{data.name}</div>
          <div className="progress">{data.progress}</div>
        </div>
        <button onClick={cleanMode}>clean</button>
        <ul className="project_content">
          {data.events.map((event, index)=>
            <li className="event">
              <div className="event_title">
                {clean? <button className="x">x</button>:<div></div>}
                <div className="event_name">{event.name}</div>
                <div className="progress">{event.progress}</div>
              </div>
              <ul className="event_content">
                {event.items.map((item,index)=>
                  <div className="item">
                    {clean? <button className="x">x</button>:<div></div>}
                    <div className="item_name">{item.name}</div>
                    <div className="progress">{item.progress}</div>
                  </div>
                )}
                <input id={index} 
                placeholder="+ Add item ..." 
                onKeyUp={(e)=>{
                  let key = window.event ? e.keyCode : e.which
                  let input = document.getElementById(index)
                  console.log(input.value)
                  console.log(event.items.length)
                  if(input.value!="" && key==13) {
                    addItem(index, input.value) 
                    input.value = ""
                  }
                }}/>
              </ul>
            </li>
          )}
          <div className="add_event">
            <input id="add_event" 
                  placeholder="+ Add event ..." 
                  onKeyUp={(e)=>{
                    let key = window.event ? e.keyCode : e.which
                    let input = document.getElementById("add_event")
                    if(input.value!="" && key==13) {
                      addEvent(input.value) 
                      input.value = ""
                    }
            }}/>
          </div>
          
        </ul>
      </div>:<div></div>}
    </>
  );
}
//export {sample};
export default Leftpart;

