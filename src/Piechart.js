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
        pieStyle : props.pieStyle,
        label: {
            type: 'inner',
            offset: '-30%',
            content: function content(_ref) {
              var percent = _ref.percent;
              return ''.concat(Math.round(percent * 100), '%');
            },
            style: {
              fontSize: 14,
              textAlign: 'center',
            },
          },
      } ;

    const pie_style = {
        width: 250,
        border: "10px",
        height: 250,
    }
    return(
        < Pie { ... config } style={pie_style} colors={['#003322', '#004422', '#005522', '#006622', '#007722', '#008822' ]} />
    )
}

export default Piechart