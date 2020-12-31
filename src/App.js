import React, {useState, useEffect}from 'react';
import Leftpart from './leftpart/Leftpart';
import Timeline from './Timeline'
import './gantt.css'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { PROJECT_QUERY,
    CREATE_PROJECT_MUTATION, 
    CREATE_EVENT_MUTATION, 
    CREATE_ITEM_MUTATION,
    DELETE_PROJECT_MUTATION,
    DELETE_EVENT_MUTATION,
    DELETE_ITEM_MUTATION,
    UPDATE_PROJECT_SUBSCRIPTION
   } from './graphql'
const projectName = 'EECS Cornerstone'


function App() {
  const { subscribeToMore, loading, data, refetch } = useQuery(PROJECT_QUERY, {variables: {name: projectName}})
  const [subscribe, setSubscribe] = useState(false)
  const [project, setProject] = useState("")
  const [count, setCount] = useState(0)

  const refetchContent = {
    refetchQueries: [{
      query: PROJECT_QUERY, 
      variables: {
        name: projectName
      }
    }]
  }

  const [addEvent] = useMutation(CREATE_EVENT_MUTATION, refetchContent)
  const [deleteEvent] = useMutation(DELETE_EVENT_MUTATION, refetchContent)
  const [addItem] = useMutation(CREATE_ITEM_MUTATION, refetchContent)
  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, refetchContent)

  
  if(!subscribe){
    subscribeToMore({
      document: UPDATE_PROJECT_SUBSCRIPTION,
      variables: { project_name: projectName},
      updateQuery: (prev, { subscriptionData }) => {
        console.log('update');
        setCount(count+1)
        return
      }
    })
    setSubscribe(true)
  }


  return(
        <>
          {loading? <div>loading</div>:
          <div className="gantt">
              <Leftpart data={data.project} 
                        addEvent={addEvent}
                        deleteEvent={deleteEvent}
                        addItem={addItem}
                        deleteItem={deleteItem}
                        />
              <Timeline data={data.project}
                        count={count} />
          </div>}
        </>
    )
}

export default App;