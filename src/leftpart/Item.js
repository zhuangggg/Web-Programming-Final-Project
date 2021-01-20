import React, {useState, useEffect} from 'react';
import '../gantt.css'
import {DeleteOutlined} from '@ant-design/icons'
import {Input, Modal} from 'antd'


function Item (props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputvalue, setInputValue] = useState({
    name: props.item.name,
    progress: props.item.progress,
    time: {
      start: props.item.time.start,
      end: props.item.time.end
    },
    usernames: props.item.usernames
  })

  console.log(inputvalue.usernames);


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    const newItem = {
      name: inputvalue.name,
      progress: inputvalue.progress,
      time: {
        start: inputvalue.time.start,
        end: inputvalue.time.end
      },
      users_id: props.item.users_id
    }
    props.getEditItem({
      variables: {
        event_name: props.event_name,
        item_name: props.item.name,
        newItem: newItem
      }
    })

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
    return(  
      <div>
        <div className="item">
          {props.edit? <button className="x" onClick={()=>{
            props.deleteItem({
              variables:{
                project_name: props.project_name,
                event_name: props.event_name,
                item_name: props.item.name
              }
            })
          }}><DeleteOutlined/></button>:<div></div>}
            <div className={props.edit?"item_name_edit":"item_name"}  onClick={showModal}>{props.item.name}</div>
            <div className={props.edit?"progress_edit":"progress"}>{props.item.progress}</div>
        </div>
        <Modal
          title="Edit Item"
          visible={isModalVisible&&props.edit}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Item Name</p>
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
          <div>
            {inputvalue.usernames.map((username)=>
            <p>{username}</p>)}
          </div>
        </Modal>
      </div>
    )
}

export default Item;
