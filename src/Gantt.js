import React, {useState, useEffect}from 'react';
import Leftpart from './leftpart/Leftpart';
import Timeline from './Timeline'
import { useQuery, useMutation } from 'react-apollo'
import { PROJECT_QUERY,
    USER_QUERY,
    CREATE_PROJECT_MUTATION, 
    CREATE_EVENT_MUTATION, 
    CREATE_ITEM_MUTATION,
    DELETE_PROJECT_MUTATION,
    DELETE_EVENT_MUTATION,
    DELETE_ITEM_MUTATION,
    UPDATE_PROJECT_SUBSCRIPTION,
    EDIT_PROJECT_MUTATION
   } from './graphql'
import test from './test.json'
import { BrowserRouter,NavLink, Switch, Route, Redirect,useLocation } from "react-router-dom";
import { message } from 'antd'
import loadingimg from './images/loading.gif'

const today = new Date()
const next = new Date()
next.setDate(new Date().getDate()+7)
const defaultStart = `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`
const defaultEnd = `${next.getFullYear()}/${next.getMonth()+1}/${next.getDate()}`
const defaultProgress = '20%'
var c = 0;

function Gantt(props) {
  const location = useLocation()
  const projectName = props.location.state.projectname
  const projectId = props.location.state.projectid
  const name = props.location.state.username
  const password = props.location.state.password
  const { subscribeToMore, loading, data, refetch } = useQuery(PROJECT_QUERY, {variables: {id: projectId}})
  const [subscribe, setSubscribe] = useState(false)
  const [project, setProject] = useState("")
  const [count, setCount] = useState(0)

  /*const refetchContent = {
    refetchQueries: [{
      query: PROJECT_QUERY, 
      variables: {
        name: projectName
      }
    }]
  }*/

  const [addEvent_db] = useMutation(CREATE_EVENT_MUTATION)
  const [deleteEvent_db] = useMutation(DELETE_EVENT_MUTATION)
  const [addItem_db] = useMutation(CREATE_ITEM_MUTATION)
  const [deleteItem_db] = useMutation(DELETE_ITEM_MUTATION)
  const [editProject_db] = useMutation(EDIT_PROJECT_MUTATION)

  const addEvent = ({variables})=>{
    const current_time = new Date()
    const gqlbody = {
      event_name: variables.event_name,
      id: variables.id,
      progress: "0%",
      start: defaultStart,
      end: defaultEnd,
      username: name,
      updatetime: current_time
    }

    let temp = project
    temp.events.push({
      name: variables.event_name,
      progress: "0%",
      time: {
        start: defaultStart,
        end: defaultEnd
      },
      items: []
    })
    setProject(temp)
    c+=1;
    addEvent_db({variables: gqlbody})
  }  
  
  const deleteEvent = ({variables})=>{
    const current_time = new Date()
    const gqlbody = {
      event_name: variables.event_name,
      id: variables.id,
      username: name,
      updatetime: current_time
    }
    let temp = project
    const index = temp.events.findIndex(event=>event.name===variables.event_name)
    temp.events.splice(index, 1)
    setProject(temp)
    c+=1;
    deleteEvent_db({variables: gqlbody})
  }

  const addItem = ({variables})=>{
    const current_time = new Date()
    const gqlbody = {
      item_name: variables.item_name,
      event_name: variables.event_name,
      id: variables.id,
      progress: defaultProgress,
      start: defaultStart,
      end: defaultEnd,
      username: name,
      updatetime: current_time
    }
    let temp = project
    const index = temp.events.findIndex(event=>event.name===variables.event_name)
    temp.events[index].items.push({
      name: variables.item_name,
      progress: defaultProgress,
      time: {
        start: defaultStart,
        end: defaultEnd
      },
      usernames: [name]
    })
    let sum = 0;
    temp.events[index].items.map(item=>sum+=parseInt(item.progress.split('%')[0]))
    temp.events[index].progress = `${temp.events[index].items.length!==0?Math.round(sum/temp.events[index].items.length):0}%`
    setProject(temp)
    c+=1;
    console.log(`addItem ${temp}`)
    addItem_db({variables: gqlbody})
    editProject({variables:{
      project: temp,
      message: `Add Item: ${temp.events[index].name}`
    }})
  }

  const deleteItem = ({variables})=>{
    const current_time = new Date()

    const gqlbody = {
      item_name: variables.item_name,
      event_name: variables.event_name,
      id: variables.id,
      username: name,
      updatetime: current_time
    }
    let temp = project
    const event_index = temp.events.findIndex(event=>event.name===variables.event_name)
    const item_index = temp.events[event_index].items.findIndex(item=>item.name===variables.item_name)
    temp.events[event_index].items.splice(item_index, 1)
    let sum = 0;
    temp.events[event_index].items.map(item=>sum+=parseInt(item.progress.split('%')[0]))
    temp.events[event_index].progress = `${temp.events[event_index].items.length!==0?Math.round(sum/temp.events[event_index].items.length):0}%`
    setProject(temp)
    c+=1;
    deleteItem_db({variables: gqlbody})
    editProject({variables:{
      project: temp,
      message: `Delete Item: ${temp.events[event_index].name}`
    }})
  }

  const editProject = ({variables},render=true)=>{
    console.log(variables);
    const current_time = new Date()

    const payload = {
      id: variables.project.id,
      recentContent: JSON.stringify(variables.project),
      username: name,
      updatetime: current_time,
      message: variables.message
    }
    setProject(variables.project)
    if (render === true) c+=1
    editProject_db({variables: payload})
  }

  const getEditEvent = ({variables})=>{
    const index = project.events.findIndex((event)=>event.name===variables.event_name)
    const temp = project
    temp.events[index] = variables.newEvent
    editProject({variables: {
      project: temp,
      message: `Edit event: ${variables.newEvent.name}`
    }})
    setProject(temp)
  }

  const getEditItem = ({variables})=>{
    console.log(variables);
    const event_index = project.events.findIndex((event)=>event.name===variables.event_name)
    const item_index = project.events[event_index].items.findIndex((item)=>item.name===variables.item_name)
    const temp = project
    temp.events[event_index].items[item_index] = variables.newItem
    let sum = 0;
    temp.events[event_index].items.map(item=>sum+=parseInt(item.progress.split('%')[0]))
    temp.events[event_index].progress = `${Math.round(sum/temp.events[event_index].items.length)}%`
    const newUserNames = [...new Set([...temp.usernames, ...temp.events[event_index].items[item_index].usernames])]
    temp.usernames = newUserNames
    console.log(temp);
    editProject({variables: {
      project: temp,
      message: `Edit item: ${variables.newItem.name}`
    }})
    setProject(temp)
  }
  
  // if(!subscribe){
  //   subscribeToMore({
  //     document: UPDATE_PROJECT_SUBSCRIPTION,
  //     variables: { project_name: projectName},
  //     updateQuery: (prev, { subscriptionData }) => {
  //       console.log('update');
  //       setCount(count+1)
  //       console.log(count+1)
  //       return
  //     }
  //   })
  //   setSubscribe(true)
  // }

  useEffect(() => {
    if(!loading && data.project!==project && !count){
      setProject(data.project)
      setCount(count+1)
    }
  }, [data]);
  return(
        <>
          {data===undefined? <div className="loadingimg" ><img src={loadingimg}/></div>:
          <div className="gantt">
              <Leftpart data={data.project} 
                        addEvent={addEvent}
                        deleteEvent={deleteEvent}
                        addItem={addItem}
                        deleteItem={deleteItem}
                        editProject={editProject}
                        getEditEvent={getEditEvent}
                        getEditItem={getEditItem}
                        />
              <Timeline data={data.project}
                        count={c}
                        editProject={editProject}/>
              <NavLink to={{pathname: `/home`, 
              state: 
              {
                password: password, 
                username: name
              }}} ><button className="back_btn"><span>Back</span></button></NavLink>

          </div>}
        </>
    )
}

export default Gantt;