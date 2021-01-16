import React, {useState, useEffect} from 'react';
import Project from '../leftpart/Project'
import test from '../test.json'

function Leftpart(props) {
  /*props.editProject({variables: {
    project: test
  }})*/
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

