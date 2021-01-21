import './login.css';
import React, { useRef, useState, useEffect } from 'react'
import $ from 'jquery'
import { USER_QUERY } from './graphql'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { message } from 'antd'
import { BrowserRouter,NavLink, Switch, Route, Redirect, useLocation } from "react-router-dom";
import Home from './Home'
import loadingimg from './images/loading.gif'


function GetInfo(props) {
  var count_info = 0;
    const location = useLocation();
    console.log(location.state);
    const name = location.state.username
    const password = location.state.password
    //console.log(location.state.refetch_userinfo)
    const [check, setCheck] = useState(false)
    const { subscribeToMore, loading, data, refetch } = useQuery(USER_QUERY, {variables: {
        name: name, 
        password: password,
        type: "login" }}) 
    refetch()
    count_info+=1
    console.log(data);
    console.log("rrrrrrrrrr");

    $(window).bind("pageshow", function() {
      refetch();
    });


    return (<>
    {loading?<div className="loadingimg" ><img src={loadingimg}/></div>:
    <Home data={data.user} count={count_info}/>}
    </>)
  }
  
  export default GetInfo;
