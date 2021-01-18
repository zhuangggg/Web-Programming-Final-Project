import React, { Component } from 'react'
import { BrowserRouter,NavLink, Switch, Route, Redirect } from "react-router-dom";
import Login from './Login'
import Gantt from './Gantt'
import Home from './Home'
import Calendar from './Calendar'

function App(){
    return (
        // <BrowserRouter basename="/my-app">
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/home/:id?" component={Home} />
                <Route path="/gantt" component={Gantt} />
                <Route path="/calendar" componemt={Calendar} />
            </Switch>
        </BrowserRouter>
    )
}

export default App
