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
    DELETE_ITEM_MUTATION } from './graphql'
const projectName = 'EECS Cornerstone'


function App() {
  const { subscribeToMore, loading, data, refetch } = useQuery(PROJECT_QUERY, {variables: {name: projectName}})
  const [count,setCount] = useState(0)
    return(
        <>
        {loading? <div>loading</div>:
        <div className="gantt">
            <Leftpart data={data.project} />
            <Timeline data={data.project} />
        </div>}
        </>
    )
}

export default App;