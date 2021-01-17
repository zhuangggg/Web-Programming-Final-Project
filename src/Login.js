import './login.css';
import React, { useRef, useState, useEffect } from 'react'
import { USER_QUERY } from './graphql'
import Next from './next' 
import { message } from 'antd'
import './antd.css'

const duration = 2

function Login() {
    const usernameRef = useRef(null)
    const useridRef = useRef(null)
    const [count, setCount] = useState(0)
    const [userid, setUserId] = useState('')
    const [username, setUsername] = useState('')
    const [mode ,setMode] = useState(0)
    const [type, setType] = useState("")

    const send = (s)=>{
      console.log(s)
        if(!userid){
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
        useridRef.current.focus()
        setCount(1)
      }
    }, [count])

    return (
      <div className="App">
        <div class="form">
         <span>GANTT CHART</span>

          <div class="username">
            <input type="text" 
            id="id"
            placeholder="ID"
            ref={useridRef}
            onChange={(e)=>setUserId(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key=== 'Enter') {
                usernameRef.current.focus()}
              } 
            }/>
          </div>
          <div class="password">
            <input type="text" 
            id="username"
            placeholder="USERNAME"
            ref={usernameRef}
            onChange={(e)=>setUsername(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key=== 'Enter') {
                send("login")}
              } 
            }/>
          </div>
          <div class="sendButton">
            <div class="login">
              <span onClick={()=>send("login")}>LOG IN</span>
            </div>
            <div class="signin">
              <span onClick={()=>send("signin")}>SIGN IN</span>
            </div>
          </div>
        </div>
        <div>
            {mode? <Next 
                    id={userid}
                    name={username}
                    type={type}
                    setMode={setMode}/>:<></>}
          </div>
      </div>
      
    );
  }
  
  export default Login;