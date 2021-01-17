import React, { Component } from 'react'
import { BrowserRouter,NavLink, Switch, Route, Redirect,useLocation } from "react-router-dom";

function Home(props){
    const location = useLocation();
    const name = location.state.username
    const data = location.state.data
    console.log(data);
    return (
        <>
            <div>Hello, {name}</div>
            {data.user.projects.length!==0? data.user.projects.map(((project, index)=>
                <NavLink to={{
                    pathname:`/gantt/${project.id}`,
                    state: {projectname: project.name}
                }}>{project.name}</NavLink>
            )):<p>no projects</p>
            }
        </>
    )
}

export default Home
