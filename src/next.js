import './login.css';
import React, { useRef, useState, useEffect } from 'react'
import { USER_QUERY } from './graphql'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { message } from 'antd'
import { BrowserRouter,NavLink, Switch, Route, Redirect } from "react-router-dom";


const duration = 2

function Next(props) {
    console.log(props);
    const { subscribeToMore, loading, data, refetch } = useQuery(USER_QUERY, {variables: {
        name: props.name, 
        id: props.id,
        type: props.type }})
    useEffect(() => {
        if(data!==undefined){
            message
            .loading('loading..')
            .then(()=>{
                console.log(data)
                if(data.user.check!=="log in success!" && data.user.check!=="sign in success!"){
                    message.error({
                        content: data.user.check,
                        duration: duration
                    })
                
                    props.setMode(0)
                }
                else {
                    message.success({
                        content: data.user.check,
                        duration: duration
                    })
                }
                props.setMode(0)
    
            })}
        
        else{
            
        }
        
    }, [data])
    return (<Redirect to={{
        pathname:`/home/${props.id}`,
        state: {userid: props.id, username:props.name}
      }}/>)
  }
  
  export default Next;