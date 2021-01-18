import React, { Component } from 'react'
import { BrowserRouter,NavLink, Switch, Route, Redirect,useLocation } from "react-router-dom";

function Home(props){
    const location = useLocation();
    const name = location.state.username
    const data = location.state.data
    const id = location.state.userid
    console.log(data);
    return (
        <>
            <div>Hello, {name}</div>
            {data.user.projects.length!==0? data.user.projects.map(((project, index)=>
              <div style={{flexDirection: "column"}}>
                <div>
                <NavLink to={{
                    pathname:`/gantt/${project.id}`,
                    state: {projectname: project.name}
                }}>{project.name}</NavLink>
                </div>
                <div>
                <NavLink to={{
                    pathname:`/calendar/`,
                    state: {
                        username: name,
                        userid: id
                    }
                }}>Calendar</NavLink>
                </div>
              </div>

            )):<p>no projects</p>
            }
        </>
    )
}

export default Home
