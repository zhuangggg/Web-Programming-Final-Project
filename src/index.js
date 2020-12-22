import React from 'react';
import ReactDOM from 'react-dom';
import './gantt.css';
import Leftpart from './leftpart/Leftpart';


ReactDOM.render(
  <div className="gantt">
    <Leftpart />
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
