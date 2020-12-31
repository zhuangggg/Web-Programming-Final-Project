import React, {useState, useEffect} from 'react';
import Project from '../leftpart/Project'


function Leftpart(props) {
  // console.log(props.data.events)
    return (
    <>
        <Project
          addEvent={props.addEvent}
          deleteEvent={props.deleteEvent}
          addItem={props.addItem}
          deleteItem={props.deleteItem}
          project = {props.data}/>
    </>
  );
}
export default Leftpart;

