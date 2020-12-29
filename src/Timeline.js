import React, { useState, useEffect } from 'react';
import ReactGantt from './Timeline_Component/gantt-for-react';
import './gantt.css'

function Timeline(props) {
  // componentDidMount() {
  //   window.setInterval(function() {
  //     this.setState({
  //       viewMode: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'][parseInt(Math.random() * 5 + 1) - 1],
  //       tasks: this.getTasks().slice(0, parseInt(Math.random() * 4 + 1))
  //     });
  //   }.bind(this), 5000)
  // };
  // const [data, setData] = useState("") 
  const [tasks, setTasks] = useState("") 
  // var task = '';

  const getTasks = (data) => {
    let tasks_array = data.events.map((event,i)=>{
      let start_date = event.time.start.split("/")
      let start = new Date(start_date[0],start_date[1]-1,start_date[2])
      let end_date = event.time.end.split("/")
      let end = new Date(end_date[0],end_date[1]-1,end_date[2])
      let task =  {
            start: start,
            end: end,
            name: event.name,
            id: "Event " + i,
            progress: event.progress.split("%")[0]
          }
      let items = event.items.map((item,i)=>{
        let start_date = item.time.start.split("/")
        let start = new Date(start_date[0],start_date[1]-1,start_date[2])
        let end_date = item.time.end.split("/")
        let end = new Date(end_date[0],end_date[1]-1,end_date[2])
        return{
              start: start,
              end: end,
              name: item.name,
              id: "Item " + i,
              progress: item.progress.split("%")[0]
            }
      })
      items.unshift(task);
      return items
    })  
    // console.log(tasks_array);
    var tasks = []
    tasks_array.forEach(element => {
      tasks = [...tasks,...element]
    });
    setTasks(tasks)
    // task = tasks
    // console.log(tasks);
    return tasks;
  };

    useEffect(() => {
    console.log("bbbbbbbbbbbbb")
    getTasks(props.data)
    console.log(props.data.events);
  },[props.count])
  // const tasks = getTasks();

  const customPopupHtml = task => {
    return `
      <div class="details-container">
        <h5>${task.name}</h5>
        <p>${task.progress}% completed!</p>
      </div>
    `;
  };

    return (
      <>
      {tasks!==""?
          <div className='timeline-container' style={{overflow: 'scroll'}}>
            <ReactGantt tasks={tasks}
                        viewMode='Week'
                        // customPopupHtml={customPopupHtml}
                        // scrollOffsets={this.state.scrollOffsets}
            />
          </div>:<div></div>
    }
    </>
    );
}

export default Timeline;