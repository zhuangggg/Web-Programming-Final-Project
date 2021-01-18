import React, { useEffect, useRef, useCallback, useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  USER_QUERY,
  PROJECT_QUERY
} from './graphql'
import './App.css'
//import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./App.css";
//import "react-big-calendar/lib/css/react-big-calendar.css";
//import 'react-big-calendar/lib/sass/styles.scss'

const localizer = momentLocalizer(moment);

function App() {
  const [projects, setProjects] = useState([])
  const [events, setEvents] = useState([])
  const [items, setItems] = useState([])
  const [username, setUsername] = useState('May')
  const [userid, setUserid] = useState('1111')
  const [type, setType] = useState('login') 
  const { data, refetch, subscribeToMore } = useQuery(USER_QUERY, {
      variables: {
          name: 'May',
          id: '1111',
          type: 'login'
      }
  })

  useEffect(() => {
    console.log(data)
    if(data){
      setProjects(data.user.projects)
      console.log(data.user.projects)
    }
  }, [data])

  useEffect(() => {
    console.log(projects);
    var itemlist = []
    projects.forEach(p => {
      console.log(p)
      p.events.forEach(e => {
        console.log(e);
        e.items.forEach(i => {
          itemlist.push({
            start: moment(i.time.start.replace('/', '-').replace('/', '-')).toDate(),
            end: moment(i.time.end.replace('/', '-').replace('/', '-')).toDate(),
            title: p.name + ' ' + e.name + ' ' + i.name,
            backgroundColor: '#ff0000',
            textColor: '#ff0000'
          })
        })
      })
    })
    console.log(itemlist)
    setItems(itemlist)
  }, [projects])

  const test = [
      {
        start: moment().toDate(),
        end: moment()
          .add(1, "days")
          .toDate(),
        title: "Some title"
      }
  ]
  console.log(test)


    return (
      <div className="App">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={items}
          style={{ height: "100vh" }}
        />
      </div>
    );
}

export default App;
