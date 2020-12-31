import React, {useState, useEffect} from 'react';
import '../gantt.css'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { PROJECT_QUERY,
  CREATE_PROJECT_MUTATION, 
  CREATE_EVENT_MUTATION, 
  CREATE_ITEM_MUTATION,
  DELETE_PROJECT_MUTATION,
  DELETE_EVENT_MUTATION,
  DELETE_ITEM_MUTATION } from '../graphql'

function Item (props) {

    return(  
      <div>
        <div className="item">
          {props.clean? <button className="x" onClick={()=>{
            props.deleteItem({
              variables:{
                project_name: props.project_name,
                event_name: props.event_name,
                item_name: props.item.name
              }
            })
          }}>x</button>:<div></div>}
          <div className="item_name">{props.item.name}</div>
          <div className="progress">{props.item.progress}</div>
        </div>
      </div>
    )
}

export default Item;
