import './login.css';
import React, { useRef, useState, useEffect } from 'react'
import { USER_QUERY } from './graphql'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { message } from 'antd'
import { BrowserRouter,NavLink, Switch, Route, Redirect, useLocation } from "react-router-dom";
import Home from './Home'
import loadingimg from './images/loading.gif'


function GetInfo(props) {
    const location = useLocation();
    const name = location.state.username
    const id = location.state.userid
    //console.log(location.state.refetch_userinfo)

    const [check, setCheck] = useState(false)
    const { subscribeToMore, loading, data, refetch } = useQuery(USER_QUERY, {variables: {
        name: name, 
        id: id,
        type: "login" }})        

    return (<>
    {loading?<div className="loadingimg" ><img src={loadingimg}/></div>:
    <Home data={data.user}/>}
    </>)
  }
  
  export default GetInfo;