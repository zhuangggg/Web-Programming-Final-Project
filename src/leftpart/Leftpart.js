import React, {useState, useEffect} from 'react';
import Project from '../leftpart/Project'


function Leftpart(props) {
    return (
    <>
        <Project
          project = {props.data}/>
    </>
  );
}
export default Leftpart;

