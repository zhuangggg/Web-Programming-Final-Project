import React, { Component } from 'react'
import { BrowserRouter,NavLink, Switch, Route, Redirect,useLocation } from "react-router-dom";
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const formItemLayout = {
    labelCol: {
        xs: { span: 0 },
        sm: { span: 0 },
    },
    wrapperCol: {
        xs: { span: 0 },
        sm: { span: 0 },
    },
    };
    const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 0, offset: 0 },
        sm: { span: 0, offset: 0 },
    },
};

function Home(props){
    const location = useLocation();
    const name = location.state.username
    const data = location.state.data
    console.log(data);

    const onFinish = values => {
        console.log(values);
        };

    return (
        <>
    <div>Hello, {name}!</div>
    <Button>My Calender</Button>
    {data.user.projects.length!==0? data.user.projects.map(((project, index)=>
        <NavLink to={{
            pathname:`/gantt/${project.id}`,
            state: {projectname: project.name}
        }}>{project.name}</NavLink>
    )):<p>No Projects</p>
    }
    <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={()=>onFinish(field)}>
      <Form.List
        name="names"
        rules={[
          {
            validator: async (_, names) => {
                console.log(names);
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item formItemLayoutWithOutLabel
                required={false}
                key={field.key}
              >
                <Form.Item
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input project name",
                    },
                  ]}
                  onChange={()=>{
                      console.log(value);
                  }}
                  noStyle
                >
                  <Input placeholder="project name" style={{ width: '60%' }} />
                </Form.Item>
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '60%' }}
                icon={<PlusOutlined />}
              >
                Add / Delete New Project
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
        </>
    )
}

export default Home
