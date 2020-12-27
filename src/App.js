import React, {useState, useEffect}from 'react';
import Leftpart from './leftpart/Leftpart';
import Timeline from './Timeline'
import './gantt.css';
import axios from 'axios'

const API_ROOT = 'http://localhost:4000/'
const instance = axios.create({
  baseURL: API_ROOT
})
const projectName = 'EECS Cornerstone'


function App() {
    const [data, setData] = useState("") 

  const getData = async() => {
    console.log('getProject')
    let msg =  await instance.post('/', {name: projectName})
    setData(msg.data)
  }
  useEffect(() => {
    if (data==""){
      getData()
    }
  })

  const updateData = async(newProject)=>{
    let msg = await instance.post('/update', {name: projectName, data: newProject})
    console.log(msg)
    setData(newProject)
  }
    return(
        <>
        {data!=="" ? 
        <div className="gantt">
            <Leftpart data={data} updateData={(data)=>updateData(data)}/>
            <Timeline data={data}/>
        </div>
        :<div></div>}
        </>
    )
}

export default App;