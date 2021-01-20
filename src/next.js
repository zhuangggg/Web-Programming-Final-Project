import './login.css';
import React, { useRef, useState, useEffect } from 'react'
import { USER_QUERY } from './graphql'
import { useQuery, useMutation } from 'react-apollo'
import { message } from 'antd'
import { BrowserRouter,NavLink, Switch, Route, Redirect } from "react-router-dom";


const duration = 2

function Next(props) {
    const [check, setCheck] = useState(false)
    const { subscribeToMore, loading, data, refetch } = useQuery(USER_QUERY, {variables: {
        name: props.name, 
        password: props.password,
        type: props.type }})
    useEffect(() => {
        console.log('useeffect');
        if(data!==undefined){
            console.log('message');
            message
            .loading('loading..')
            .then(()=>{
                console.log(data)
                if(data.user.check!=="Log in success!" && data.user.check!=="Sign in success!"){
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
                    setCheck(true)
                }
                props.setMode(0)
    
            })}
        
        else{
            
        }
        
    }, [data])

    return (<div>
        {check?<Redirect to={{
        pathname:`/home`,
        state: {
            password: props.password, 
            username:props.name}
      }}/>:<></>}
    </div>)
  }
  
  export default Next;