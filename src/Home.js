import React, { Component, useState } from 'react'
import './home.css'
import {CREATE_PROJECT_MUTATION, ADD_PROJECT_ID_MUTATION, DELETE_PROJECT_MUTATION} from './graphql'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {v4 as uuidv4} from 'uuid'
import { BrowserRouter,NavLink, Switch, Route, Redirect, useLocation } from "react-router-dom";
import userimg from './images/user.png'
import {DeleteOutlined} from '@ant-design/icons'
import {Modal, Select} from 'antd'

const colors = [
    ["#d7a05b", "#eabe7c", "#cdb590", "#aa916a", "#816f53"],
    ["#6c4760", "#617899", "#38acaf", "#6fda97", "#e6f972"],
]

function Home(props){

    const [projects, setProjects] = useState(props.data.projects)

    const [addProject_db] = useMutation(CREATE_PROJECT_MUTATION)
    const [deleteProject_db] = useMutation(DELETE_PROJECT_MUTATION)
    const [addProject_id_for_user] = useMutation(ADD_PROJECT_ID_MUTATION)    
    const [count, setCount] = useState(0)
    const [clean, setClean] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const name = props.data.userinfo.name
    const id = props.data.userinfo.id
    const deleteProject = (project_name)=>{
        let temp = projects
        const index = temp.findIndex(project=>project.name===project_name)
        temp.splice(index, 1)
        setProjects(temp)
        setCount(count+1)
        deleteProject_db({variables: {name: project_name}})
    }
    const addProject = (project_name)=>{
        const newid = uuidv4()
        const newProject = {
            name: project_name,
            id: newid,
            color: 0,
            username: name
        }
        const temp = projects
        temp.push(newProject)
        setProjects(temp)
        setCount(count+1)
        addProject_id_for_user({variables:{
            name: name,
            project_id: newid
        }})
        addProject_db({variables: newProject})
    }

    const cleanMode = ()=>{
        setClean(!clean)
      }

    
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    const newEvent = {
      name: inputvalue.name,
      progress: inputvalue.progress,
      time: {
        start: inputvalue.time.start,
        end: inputvalue.time.end
      },
      items: props.event.items
    }
    props.getEditEvent({
      variables: {
        event_name: props.event.name,
        newEvent: newEvent
      }
    })

  };

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getStyle = (color)=>{
      return {
        height: "20px",
        width: "20px",
        margin: "5px",
        background: color
      }
  }

    return (
        <div className="home">
            <div className="left">
                <img className="userimg" src={userimg}/>
                <div className="title">Hello, {name}</div>
                <div class="button_cont" align="center">
                    <NavLink to={{
                        pathname:`/calendar/`,
                        state: {
                            username: name,
                            userid: id
                        }
                    }}>
                <div className="example_f"><span>Calendar</span></div></NavLink>
                </div>
            </div>
            <div className="right">
                {projects.length!==0? projects.map(((project, index)=>
                <div style={{flexDirection: "column"}}>
                    <div className="project">
                        {clean?
                            <div className="project">
                                <button className="project_btn_edit" onClick={showModal}><span>{project.name}</span></button>
                                <div className="x" onClick={()=>deleteProject(project.name)}><DeleteOutlined/></div>
                            </div>:
                            <NavLink to={{
                                pathname:`/gantt/${project.id}`,
                                state: {projectname: project.name, username: name}
                            }}><button className="project_btn"><span>{project.name}</span></button></NavLink>}
                    </div>
                </div>
                )):<p>no projects</p>
                }
                <input  className="add_project"
                id={props.eventIndex} 
                placeholder="+ Add Project ..." 
                onKeyUp={(e)=>{  
                let key = window.event ? e.keyCode : e.which
                let input = document.getElementsByClassName("add_project")[0]
                if(input.value!="" && key==13) {
                    addProject(input.value)
                    input.value = ""}}}/>
                <button onClick={cleanMode} className="clearproject">Clear Projects</button>
            </div>
            <Modal
                title="Edit Project"
                visible={isModalVisible&&clean}
                onOk={handleOk}
                onCancel={handleCancel}
                >
                <p>Style</p>
                <Select defaultValue="lucy" style={{ width: 200 }} onChange={handleChange}>
                    <Option>{colors[0].map(((color)=>
                    <div className="option"><div style={getStyle(color)}/></div>))}</Option>
                    <Option value="lucy">Lucy</Option>
                </Select>
            </Modal>
        </div>
    )
}

export default Home