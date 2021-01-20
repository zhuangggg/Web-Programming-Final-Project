import './login.css';
import React, { useRef, useState, useEffect } from 'react'
import { USER_QUERY } from './graphql'
import Next from './next' 
import { message, Input, Button } from 'antd'
import 'antd/dist/antd.css'


const duration = 2

function Login() {
    const usernameRef = useRef(null)
    const userpasswordRef = useRef(null)
    const [count, setCount] = useState(0)
    const [username, setUsername] = useState('')
    const [userpassword, setUserPassword] = useState('')
    const [mode ,setMode] = useState(0)
    const [type, setType] = useState("")

    const send = (s)=>{
        if(!userpassword){
            message.error({
                content: "id cannot be empty",
                duration: duration
            })
            return
        }
        else if(!username){
            message.error({
                content: "username cannot be empty",
                duration: duration
            })
            return
        }
        else {
          setMode(1)
          setType(s)
        }
    }

    useEffect(() => {
      if(!count){
        usernameRef.current.focus()
        setCount(1)
      }
    }, [count])

    return (
      <div className="App">
        <div className="form">
         <span>GANTT CHART</span>

          <div className="username">
            <input type="text" 
            id="username"
            placeholder="Username"
            ref={usernameRef}
            onChange={(e)=>setUsername(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key=== 'Enter') {
                userpasswordRef.current.focus()}
              } 
            }/>
          </div>
          <div className="password">
            <input type="password" 
            id="password"
            placeholder="Password"
            ref={userpasswordRef}
            onChange={(e)=>setUserPassword(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key=== 'Enter') {
                send("login")}
              } 
            }/>
          </div>
          <div className="sendButton">
              <button className="login" onClick={()=>send("login")}>LOG IN</button>
              <button className="signin" onClick={()=>send("signin")}>SIGN IN</button>
          </div>
        </div>
        <div>
            {mode? <Next 
                    name={username}
                    password={userpassword}
                    type={type}
                    setMode={setMode}/>:<></>}
          </div>
      </div>
      
    );
  }
  
  export default Login;
