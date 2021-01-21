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
        color: props.color,
        // pieStyle : props.pieStyle,
        label: {
            type: 'inner',
            offset: '-30%',
            content: function content(_ref) {
                var name = _ref.x
              var percent = _ref.percent;
              return `${name} ${''.concat(Math.round(percent * 100), '%')}`;
            },
            style: {
              fontSize: 14,
              textAlign: 'center',
            },
          },
        legend: false,
      } ;

    const pie_style = {
        width: 250,
        border: "10px",
        height: 250,
    }
    return(
        < Pie { ... config } style={pie_style} />
    )
}

export default Piechart