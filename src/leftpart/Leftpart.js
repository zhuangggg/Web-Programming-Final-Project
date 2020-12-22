import React, {useState, useEffect} from 'react';
import '../gantt.css'
import axios from 'axios'
import Project from './Project'

const API_ROOT = 'http://localhost:4000/'
const instance = axios.create({
  baseURL: API_ROOT
})

const projectName = 'EECS Cornerstone'

function Leftpart() {
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
    //setData("")
  }
    return (
    <>
    {data!=="" ? 
      <Project
        project = {data}
        updateData = {updateData}/>
    :<div></div>}
    </>
  );
}
export default Leftpart;

