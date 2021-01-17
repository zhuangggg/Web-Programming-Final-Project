import React, { Component } from 'react'
import { BrowserRouter,NavLink, Switch, Route, Redirect,useLocation } from "react-router-dom";

function Home(props){
    const location = useLocation();
    const name = location.state.username
    return (
        <>
            <div>Hello, {name}</div>
            <p><NavLink to='/gantt'>EECS Cornerstone</NavLink></p>
        </>
    )
}

export default Home
