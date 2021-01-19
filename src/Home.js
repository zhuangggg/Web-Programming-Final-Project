import React, { Component, useState } from 'react'
import './home.css'
import {CREATE_PROJECT_MUTATION, ADD_PROJECT_ID_MUTATION, DELETE_PROJECT_MUTATION} from './graphql'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {v4 as uuidv4} from 'uuid'
import { BrowserRouter,NavLink, Switch, Route, Redirect, useLocation } from "react-router-dom";
import userimg from './images/user.png'
import {DeleteOutlined} from '@ant-design/icons'

function Home(props){

    const [projects, setProjects] = useState(props.data.projects)

    const [addProject_db] = useMutation(CREATE_PROJECT_MUTATION)
    const [deleteProject_db] = useMutation(DELETE_PROJECT_MUTATION)
    const [addProject_id_for_user] = useMutation(ADD_PROJECT_ID_MUTATION)    
    const [count, setCount] = useState(0)
    const [clean, setClean] = useState(false)

    const name = props.data.userinfo.name
    const id = props.data.userinfo.id
    console.log(props.data);
    const deleteProject = (project_name)=>{
        let temp = projects
        const index = temp.findIndex(project=>project.name===project_name)
        console.log(index)
        temp.splice(index, 1)
        setProjects(temp)
        setCount(count+1)
        deleteProject_db({variables: {name: project_name}})
    }
    const addProject = (project_name)=>{
        console.log(project_name);
        const newid = uuidv4()
        const newProject = {
            name: project_name,
            id: newid,
            usernames: [name]
        }
        const temp = projects
        temp.push(newProject)
        console.log(temp);
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
                        <NavLink to={{
                            pathname:`/gantt/${project.id}`,
                            state: {projectname: project.name, username: name}
                        }}><button className="project_btn"><span>{project.name}</span></button></NavLink>
                        {clean?<div className="x" onClick={()=>deleteProject(project.name)}><DeleteOutlined/></div>:<div></div>}
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
                    console.log(input.value);
                    addProject(input.value)
                    input.value = ""}}}/>
                <button onClick={cleanMode} className="clearproject">Clear Projects</button>
            </div>
        </div>
    )
}

export default Home