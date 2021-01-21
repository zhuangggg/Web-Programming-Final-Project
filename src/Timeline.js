import React, { useState, useEffect } from 'react';
import ReactGantt from './Timeline_Component/gantt-for-react';
import './gantt.css'
import './timeline.css'

function Timeline(props) {
  const [tasks, setTasks] = useState("")

  const getTasks = (data) => {
    if (data.events.length !==0){
      let tasks_array = data.events.map((event,i)=>{
          let sum = 0;
          let items = event.items.map((item,j)=>{
            sum += parseInt(item.progress.split("%")[0]);
          let start_date = item.time.start.split("/")
          let start = new Date(start_date[0],start_date[1]-1,start_date[2])
          let end_date = item.time.end.split("/")
          let end = new Date(end_date[0],end_date[1]-1,end_date[2])
          return{
                start: start,
                end: end,
                name: item.name,
                id: "Item " +i+"-"+ j,
                progress: parseInt(item.progress.split("%")[0]),
                custom_class: `event_${i%5}`,
                usernames: item.usernames
              }
        })
        let start_date = event.time.start.split("/")
        let start = new Date(start_date[0],start_date[1]-1,start_date[2])
        let end_date = event.time.end.split("/")
        let end = new Date(end_date[0],end_date[1]-1,end_date[2])
        let task =  {
              start: start,
              end: end,
              name: event.name,
              id: "Event " + i,
              progress: event.items.length !==0?Math.round(sum/event.items.length):0,
              custom_class: `event_${i%5}`
            }
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
    }
    else{
      setTasks([{
        start: new Date(),
        end: new Date(),
        name: '   ',
        id: "Event 0",
        progress: "0",
        custom_class: 'transparent'
      }])
    }
  };

  useEffect(() => {
    console.log("bbbbbbbbbbbbb")
    getTasks(props.data)
    //console.log(props.data.events);
  },[props.count])
  // const tasks = getTasks();

  const customPopupHtml = task => {
    // console.log(task);
    const start = `${task._start.getMonth()+1}/${task._start.getDate()}`
    const end = `${task._end.getMonth()+1}/${task._end.getDate()}`
    return task.usernames !== undefined?`
      <div class="details-container">
        <h4 style='margin:0'>${task.name} - ${task.usernames.toString()}</h4>
        <p>Time: ${start} - ${end}</p>
        <p>Progress: ${task.progress}%</p>
      </div>
    `:`<div class="details-container">
    <h4 style='margin:0'>${task.name}</h4>
    <p>Time: ${start} - ${end}</p>
    <p>Progress: ${task.progress}%</p>
  </div>`;
  };

  const handleDateChange = (task,start,end)=>{
    var project = props.data;
    var taskId = task.id.split(" ");
    switch (taskId[0]){
      case 'Event':
        project.events[taskId[1]].time.start = `${start.getFullYear()}/${start.getMonth()+1}/${start.getDate()}`;
        project.events[taskId[1]].time.end = `${end.getFullYear()}/${end.getMonth()+1}/${end.getDate()}`;
        props.editProject({variables:{
          project: project,
          message: `Edit event: ${project.events[taskId[1]].name}`
        }},false)
        break;
      case 'Item':
        project.events[taskId[1].split('-')[0]].items[taskId[1].split('-')[1]].time.start = `${start.getFullYear()}/${start.getMonth()+1}/${start.getDate()}`;
        project.events[taskId[1].split('-')[0]].items[taskId[1].split('-')[1]].time.end = `${end.getFullYear()}/${end.getMonth()+1}/${end.getDate()}`;
        props.editProject({variables:{
          project: project,
          message: `Edit item: ${project.events[taskId[1].split('-')[0]].items[taskId[1].split('-')[1]].name}`
        }},false)
        break;
    }

  }

  const handleProgressChange = (task,progress)=>{
    var project = props.data;
    var taskId = task.id.split(" ");
    let sum = 0;
    switch (taskId[0]){
      case 'Event':
        project.events[taskId[1]].progress = `${progress}%`;
        props.editProject({variables:{
          project: project,
          message: `Edit event: ${project.events[taskId[1]].name}`
        }})
        break;
      case 'Item':
        project.events[taskId[1].split('-')[0]].items[taskId[1].split('-')[1]].progress = `${progress}%`;
        project.events[taskId[1].split('-')[0]].items.map(item=>{
        sum+=parseInt(item.progress.split('%')[0])
      })
        project.events[taskId[1].split('-')[0]].progress = `${Math.round(sum/project.events[taskId[1].split('-')[0]].items.length)}%`
        props.editProject({variables:{
          project: project,
          message: `Edit item: ${project.events[taskId[1].split('-')[0]].items[taskId[1].split('-')[1]].name}`
        }})
        break;
      }
    
  }

    return (
      <>
      {tasks!==""?
          <div className={`timeline-container color_${props.data.color}`}>
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