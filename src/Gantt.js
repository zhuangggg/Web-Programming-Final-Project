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
  const name = props.location.state.username

  const { subscribeToMore, loading, data, refetch } = useQuery(PROJECT_QUERY, {variables: {name: projectName}})
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
    const gqlbody = {
      event_name: variables.event_name,
      project_name: variables.project_name,
      progress: defaultProgress,
      start: defaultStart,
      end: defaultEnd
    }
    let temp = project
    temp.events.push({
      name: variables.event_name,
      progress: defaultProgress,
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
    const gqlbody = {
      event_name: variables.event_name,
      project_name: variables.project_name,
    }
    let temp = project
    const index = temp.events.findIndex(event=>event.name===variables.event_name)
    temp.events.splice(index, 1)
    setProject(temp)
    c+=1;
    deleteEvent_db({variables: gqlbody})
  }

  const addItem = ({variables})=>{
    const gqlbody = {
      item_name: variables.item_name,
      event_name: variables.event_name,
      project_name: variables.project_name,
      progress: defaultProgress,
      start: defaultStart,
      end: defaultEnd,
      username: name
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
    setProject(temp)
    c+=1;
    console.log(gqlbody)
    addItem_db({variables: gqlbody})
  }

  const deleteItem = ({variables})=>{
    const gqlbody = {
      item_name: variables.item_name,
      event_name: variables.event_name,
      project_name: variables.project_name,
    }
    let temp = project
    const event_index = temp.events.findIndex(event=>event.name===variables.event_name)
    const item_index = temp.events[event_index].items.findIndex(item=>item.name===variables.item_name)
    temp.events[event_index].items.splice(item_index, 1)
    setProject(temp)
    c+=1;
    deleteItem_db({variables: gqlbody})
  }

  const editProject = ({variables})=>{
    console.log(variables);
    const payload = {
      name: variables.name,
      recentContent: JSON.stringify(variables)
    }
    setProject(variables)
    c+=1
    editProject_db({variables: payload})
  }

  const getEditEvent = ({variables})=>{
    const index = project.events.findIndex((event)=>event.name===variables.event_name)
    const temp = project
    temp.events[index] = variables.newEvent
    editProject({variables: temp})
    setProject(temp)
  }

  const getEditItem = ({variables})=>{
    console.log(variables);
    const event_index = project.events.findIndex((event)=>event.name===variables.event_name)
    const item_index = project.events[event_index].items.findIndex((item)=>item.name===variables.item_name)
    const temp = project
    temp.events[event_index].items[item_index] = variables.newItem
    console.log(temp);
    editProject({variables: temp})
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
          {!project? <div className="loadingimg" ><img src={loadingimg}/></div>:
          <div className="gantt">
              <Leftpart data={project} 
                        addEvent={addEvent}
                        deleteEvent={deleteEvent}
                        addItem={addItem}
                        deleteItem={deleteItem}
                        editProject={editProject}
                        getEditEvent={getEditEvent}
                        getEditItem={getEditItem}
                        />
              <Timeline data={project}
                        count={c}
                        editProject={editProject}/>
          </div>}
        </>
    )
}

export default Gantt;