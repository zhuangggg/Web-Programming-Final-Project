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
  // console.log(props.data.events)

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
            progress: event.progress.split("%")[0],
            custom_class: 'eventBar'
          }
      let items = event.items.map((item,j)=>{
        let start_date = item.time.start.split("/")
        let start = new Date(start_date[0],start_date[1]-1,start_date[2])
        let end_date = item.time.end.split("/")
        let end = new Date(end_date[0],end_date[1]-1,end_date[2])
        return{
              start: start,
              end: end,
              name: item.name,
              id: "Item " +i+"-"+ j,
              progress: item.progress.split("%")[0],
              custom_class: 'itemBar'
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
    const start = `${task._start.getMonth()}/${task._start.getDate()}`
    const end = `${task._end.getMonth()}/${task._end.getDate()}`
    return `
      <div class="details-container">
        <h4 style='margin:0'>${task.name}</h4>
        <span>Time: </span><input value="${start}" /><span> - </span><input value="${end}"/>
        <span>Progress: </span><input value="${task.progress}"/><span>%</span>
      </div>
    `;
  };

  const handleDateChange = (task,start,end)=>{
    var payload = props.data;
    var taskId = task.id.split(" ");
    switch (taskId[0]){
      case 'Event':
        payload.events[taskId[1]].time.start = `${start.getFullYear()}/${start.getMonth()+1}/${start.getDate()}`;
        payload.events[taskId[1]].time.end = `${end.getFullYear()}/${end.getMonth()+1}/${end.getDate()}`;
        break;
      case 'Item':
        payload.events[taskId[1].split('-')[0]].items[taskId[1].split('-')[1]].time.start = `${start.getFullYear()}/${start.getMonth()+1}/${start.getDate()}`;
        payload.events[taskId[1].split('-')[0]].items[taskId[1].split('-')[1]].time.end = `${end.getFullYear()}/${end.getMonth()+1}/${end.getDate()}`;
        break;
    }
    props.editProject(payload)
  }

  const handleProgressChange = (task,progress)=>{
    var payload = props.data;
    var taskId = task.id.split(" ");
    switch (taskId[0]){
      case 'Event':
        payload.events[taskId[1]].progress = `${progress}%`;
        break;
      case 'Item':
        payload.events[taskId[1].split('-')[0]].items[taskId[1].split('-')[1]].progress = `${progress}%`;
    }
    props.editProject(payload)
  }

    return (
      <>
      {tasks!==""?
          <div className='timeline-container' style={{overflow: 'scroll'}}>
            <ReactGantt tasks={tasks}
                        viewMode='Week'
                        onDateChange={handleDateChange}
                        onProgressChange={handleProgressChange}
                        customPopupHtml={customPopupHtml}
                        // scrollOffsets={this.state.scrollOffsets}
            />
          </div>:<div></div>
    }
    </>
    );
}

export default Timeline;