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
            <p><NavLink to={{
                pathname:`/gantt/${data.user.projects[0].id}`,
                state: {projectname: data.user.projects[0].name}
      }}>{data.user.projects[0].name}</NavLink></p>
        </>
    )
}

export default Home
