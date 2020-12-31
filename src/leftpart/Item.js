import React, {useState, useEffect} from 'react';
import '../gantt.css'


function Item (props) {
  const [itemData, setItemData] = useState("") 
  const [showInfo, setShowInfo] = useState(false)
  const [count, setCount] = useState(0)  

  
  const getItemData = ()=>{
      setItemData(props.item)
  }

  useEffect(() => {
      if(itemData=="") getItemData()
  })

  const sendToProps = ()=>{
    props.updateEvent(props.eventIndexitemIndex, itemData)
    setCount(count+1)
}


  const clickInfo = ()=>{
    setShowInfo(!showInfo)
  }

  const editItem = (eventIndex, itemIndex)=>{
    
  }
    return(  
      <div>
        <div className="item">
          {props.clean? <button className="x" onClick={()=>{console.log(props.itemIndex); props.cleanItem(props.itemIndex)}}>x</button>:<div></div>}
          <div className="item_name">{itemData.name}</div>
          <div className="progress">{itemData.progress}</div>
        </div>
      </div>
    )
}

export default Item;
