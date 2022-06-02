import React, { useEffect,useContext } from 'react'
import {Button, Form, Input, Modal} from 'antd';
import logo from "../UniqgeneLogo.png"
import "./Login.css"
import useAuth from "../hooks/useAuth";
import { UserContext } from './../hooks/UserContext';
import { useNavigate } from "react-router-dom";


function Login() {

    const navigate = useNavigate();

    const {loginUser} = useAuth();
    const {user} = useContext(UserContext);

  useEffect(() => {
    if(user){
      navigate("/");
    }
  }, [user]);








    const onFinish = async(values) => {
    
      await loginUser(values);

    };

    const onFinishFailed = () => {
        console.log('Failed:');
      };



  return (
    <div className="login">
        <img src={logo} alt="logo" className="logo"/>
        <Form
      name="basic"
      labelCol={{
        span: 7,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
    
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

     

      <Form.Item
        wrapperCol={{
          offset: 11,
          span: 12,
        }}
      >
        <Button type="primary" htmlType="submit" style={{marginTop: 20}}>
          Sign in
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}

export default Login