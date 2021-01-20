import React, { Component, useState } from 'react'
import './home.css'
import {CREATE_PROJECT_MUTATION, DELETE_PROJECT_MUTATION, EDIT_PROJECT_MUTATION} from './graphql'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {v4 as uuidv4} from 'uuid'
import { BrowserRouter,NavLink, Switch, Route, Redirect, useLocation } from "react-router-dom";
import userimg from './images/user.png'
import {DeleteOutlined} from '@ant-design/icons'
import {Modal, Select} from 'antd'
import Analysis from './Analysis'

const colors = [
    ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"],
    ["#ffcdb2", "#ffb4a2", "#e5989b", "#b5838d", "#6d6875"],
    ["#1C78E6", "#00B4F0", "#0BD9CE", "#00D184", "#6CE692"],
    ["#d7a05b", "#eabe7c", "#cdb590", "#aa916a", "#816f53"],
    ["#6c4760", "#617899", "#38acaf", "#6fda97", "#e6f972"],
]

function Home(props){
    console.log(props)
    const [projects, setProjects] = useState(props.data.projects)

    const [addProject_db] = useMutation(CREATE_PROJECT_MUTATION)
    const [deleteProject_db] = useMutation(DELETE_PROJECT_MUTATION)
    const [count, setCount] = useState(0)
    const [clean, setClean] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [projectIndex,setProjectIndex] = useState(0)
    const [colorIndex,setColorIndex] = useState(0)

    const [editProject_db] = useMutation(EDIT_PROJECT_MUTATION)

    const name = props.data.userinfo.name
    const password = props.data.userinfo.password
    const id = props.data.userinfo.password
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
        addProject_db({variables: newProject})
    }

    const cleanMode = ()=>{
        setClean(!clean)
      }

    
  const showModal = (index) => {
    setProjectIndex(index)
    console.log(index);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    let temp = projects[projectIndex];
    temp.color = colorIndex;
    console.log(temp);
    editProject({variables:temp})
    let newProjects = projects;
    newProjects[projectIndex] = temp;
    setProjects(newProjects)
    setIsModalVisible(false)
  };
  
  const editProject = ({variables})=>{
    const payload = {
      name: variables.name,
      recentContent: JSON.stringify(variables)
    }
    editProject_db({variables: payload})
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
    setColorIndex(value)
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
                <div className="button_cont" align="center">
                    <NavLink to={{
                        pathname:`/calendar/`,
                        state: {
                            username: name,
                            userid: id,
                            projects: props.data.projects,
                            projectsColors: colors
                        }
                    }}>
                    <div className="example_f"><span>Calendar</span></div></NavLink>
                    <NavLink to={{pathname: `/`}}>log out</NavLink>
                </div>
            </div>
            <div className="right">
                {projects.length!==0? projects.map(((project, index)=>
                <div style={{flexDirection: "column"}}>
                    <div className="project">
                        {clean?
                            <div className="project">
                                <button className="project_btn_edit" onClick={()=>showModal(index)} style={{background:colors[projects[index].color][2]}}><span>{project.name}</span></button>
                                <div className="x" onClick={()=>deleteProject(project.name)}><DeleteOutlined/></div>
                            </div>:
                            <NavLink to={{
                                pathname:`/gantt/${project.id}`,
                                state: {projectname: project.name, username: name, password: password}
                            }}><button className="project_btn" style={{background:colors[projects[index].color][2]}}><span>{project.name}</span></button></NavLink>}
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
                <button onClick={cleanMode} className="clearproject">Edit Projects</button>
            </div>
            {projects.length?<Modal
                title="Edit Project"
                visible={isModalVisible&&clean}
                onOk={handleOk}
                onCancel={handleCancel}
                >
                <p>Style</p>
                <Select defaultValue={projects[projectIndex].color} style={{ width: 200 }} onChange={handleChange}>
                    {colors.map((color_set,i)=><Option value={i}>
                    <div className="option">{color_set.map(((color)=>
                    <div style={getStyle(color)}/>))}</div></Option>)}
                </Select>
            </Modal>:<></>}
        </div>
    )
}

export default Home

// <Analysis project={project} color={colors[projects[index].color][2]}/>
