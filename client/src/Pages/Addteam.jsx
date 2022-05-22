import React from 'react'
import axios from "axios"
import {Modal, Button, Form, Input, } from 'antd';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header'



const Addteam = () => {

    const navigate = useNavigate();

    function success() {
        Modal.success({
            title: 'Success',
            content: 'Team added successfully',
            onOk: () => {
                navigate("/add-data");
            },
        });
    }

    function error() {
        Modal.error({
            title: 'Error',
            content: 'Team already exists or not created !!!',
        });
    }

const onFinish = async(values) => {

    const data = {
        "name": values.team
    }

    const result = await axios.post("/add-teamname",data);
    result.data === "Success" ? success() : error();
}





  return (
    <div>
        <Header/>
        <Form
                name="basic"
                layout="horizontal"
                initialValues={{ remember: true }}
                wrapperCol={{ span: 4}}
                labelCol={{ span: 10 }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Team"
                    name="team"
                    rules={[{ required: true, message: 'Please input team name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 11, span: 4 }}>
                    <Button type="primary" htmlType='submit'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
                 
    </div>
  )
}

export default Addteam