import React, {useState, useEffect}from 'react';
import Leftpart from './leftpart/Leftpart';
import Timeline from './Timeline'
import './gantt.css'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { PROJECT_QUERY,
    USER_QUERY,
    CREATE_PROJECT_MUTATION, 
    CREATE_EVENT_MUTATION, 
    CREATE_ITEM_MUTATION,
    DELETE_PROJECT_MUTATION,
    DELETE_EVENT_MUTATION,
    DELETE_ITEM_MUTATION,
    UPDATE_PROJECT_SUBSCRIPTION
   } from './graphql'


const defaultStart = '2020/3/10'
const defaultEnd = '2020/3/20'
const defaultProgress = '30%'
const projectName = 'EECS Cornerstone'


function App() {
  const { subscribeToMore, loading, data, refetch } = useQuery(PROJECT_QUERY, {variables: {name: projectName}})
  const [subscribe, setSubscribe] = useState(false)
  const [project, setProject] = useState("")
  const [count, setCount] = useState(0)
  
  const { loading:_loading, data:_data } = useQuery(USER_QUERY, {variables: {name: "May"}})

  console.log(data);
  console.log(_data);

  const refetchContent = {
    refetchQueries: [{
      query: PROJECT_QUERY, 
      variables: {
        name: projectName
      }
    }]
  }

  const [addEvent_db] = useMutation(CREATE_EVENT_MUTATION, refetchContent)
  const [deleteEvent_db] = useMutation(DELETE_EVENT_MUTATION, refetchContent)
  const [addItem_db] = useMutation(CREATE_ITEM_MUTATION, refetchContent)
  const [deleteItem_db] = useMutation(DELETE_ITEM_MUTATION, refetchContent)

  const addEvent = ({variables})=>{
    console.log(variables)
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
    setCount(count+1)
    addEvent_db({variables: gqlbody})
  }  
  
  const deleteEvent = ({variables})=>{
    console.log(variables)
    const gqlbody = {
      event_name: variables.event_name,
      project_name: variables.project_name,
    }
    let temp = project
    const index = temp.events.findIndex(event=>event.name===variables.event_name)
    temp.events.splice(index, 1)
    console.log(index)
    setProject(temp)
    setCount(count+1)
    deleteEvent_db({variables: gqlbody})
  }

  const addItem = ({variables})=>{
    const gqlbody = {
      item_name: variables.item_name,
      event_name: variables.event_name,
      project_name: variables.project_name,
      progress: defaultProgress,
      start: defaultStart,
      end: defaultEnd
    }
    let temp = project
    const index = temp.events.findIndex(event=>event.name===variables.event_name)
    temp.events[index].items.push({
      name: variables.item_name,
      progress: defaultProgress,
      time: {
        start: defaultStart,
        end: defaultEnd
      }
    })
    setProject(temp)
    setCount(count+1)
    addItem_db({variables: gqlbody})
  }

  const deleteItem = ({variables})=>{
    console.log(variables)
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
    setCount(count+1)
    deleteItem_db({variables: gqlbody})
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
      console.log('setData')
      setProject(data.project)
      setCount(count+1)
    }
  }, [data]);
  return(
        <>
          {!project? <div>loading</div>:
          <div className="gantt">
              <Leftpart data={project} 
                        addEvent={addEvent}
                        deleteEvent={deleteEvent}
                        addItem={addItem}
                        deleteItem={deleteItem}
                        />
              <Timeline data={project}
                        count={count}/>
          </div>}
        </>
    )
}

export default App;