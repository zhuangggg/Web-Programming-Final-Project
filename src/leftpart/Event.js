import React, {useState, useEffect} from 'react';
import '../gantt.css'
import Item from './Item'
import {DeleteOutlined} from '@ant-design/icons'
import {Input, Modal} from 'antd'
import "antd/dist/antd.css";


function Event (props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputvalue, setInputValue] = useState({
    name: props.event.name,
    progress: props.event.progress,
    time: {
      start: props.event.time.start,
      end: props.event.time.end
    },
  })

  console.log(inputvalue);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    const newEvent = {
      name: inputvalue.name,
      progress: inputvalue.progress,
      time: {
        start: inputvalue.time.start,
        end: inputvalue.time.end
      },
      items: props.event.items
    }
    console.log(props.event.name);
    props.getEditEvent({
      variables: {
        event_name: props.event.name,
        newEvent: newEvent
      }
    })

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
    return(
      <>
        <li className="event" id={"event_"+props.eventIndex}>
          <div className="event_title">
            {props.edit? <button className="x" onClick={()=>{
              props.deleteEvent({
                variables:{
                  project_name: props.project_name,
                  event_name: props.event.name
                }
              })
            }}><DeleteOutlined/></button>:<div></div>}
            <div className={props.edit?"event_name_edit":"event_name"}  onClick={showModal}>{props.event.name}</div>
            <div className={props.edit?"progress_edit":"progress"}>{props.event.progress}</div>
          </div>
          <ul className="event_content">
            {props.event.items.map((item,itemIndex)=>
              <Item
                deleteItem={props.deleteItem}
                project_name={props.project_name}
                event_name={props.event.name}
                item={item}
                itemIndex={itemIndex}
                edit={props.edit}
                getEditItem={props.getEditItem}/>)}
          </ul>
        </li>
        <input  className="add_item"
          id={props.eventIndex} 
          placeholder="+ Add item ..." 
          onKeyUp={(e)=>{  
            let key = window.event ? e.keyCode : e.which
            let input = document.getElementById(props.eventIndex)
            if(input.value!="" && key==13) {
              props.addItem({
                variables:{
                  project_name: props.project_name,
                  event_name: props.event.name,
                  item_name: input.value
                }
              }) 
              input.value = ""}}}/>
                  <Modal
                    title="Edit Event"
                    visible={isModalVisible&&props.edit}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <p>Event Name</p>
                    <Input value={inputvalue.name} onChange={(e)=>{
                      setInputValue({...inputvalue, name: e.target.value})}} />
                    <p>Progress</p>
                    <Input value={inputvalue.progress} onChange={(e)=>{
                      setInputValue({...inputvalue, progress: e.target.value})}}/>
                    <p>Start</p>
                    <Input value={inputvalue.time.start} onChange={(e)=>{
                      setInputValue({...inputvalue, time: {start: e.target.value, end: inputvalue.time.end}})}}/>
                    <p>End</p>
                    <Input value={inputvalue.time.end} onChange={(e)=>{
                      setInputValue({...inputvalue, time: {start: inputvalue.time.start, end: e.target.value}})}}/>
                  </Modal>
      </>
    )
}

export default Event;
