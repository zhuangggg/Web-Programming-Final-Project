import React, { Component, useState, useEffect } from 'react'
import { Progress } from 'antd';
import { Pie } from '@ant-design/charts' ;     


function Piechart(props) {
    console.log(props.color);
    const data = props.data
    const config = { 
        data ,
        angleField : 'y' , 
        colorField : 'x' , 
      } ;

    const pie_style = {
        width: 250,
        border: "10px"
    }

    return(
        < Pie { ... config } style={pie_style} />
    )
}

export default Piechart