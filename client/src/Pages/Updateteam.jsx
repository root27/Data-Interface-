import React, { useEffect } from 'react'
import axios from 'axios'
import {Modal, Button, Form, Input, Select} from 'antd';
import { generatePath, useLocation, useNavigate } from "react-router-dom";
import Header from '../components/Header'

const Updateteam = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm();
    const location = useLocation();

    function success() {
        Modal.success({
            title: 'Success',
            content: 'Team updated successfully',
        });
    }

    useEffect(() => {
        const path = generatePath(`/get/:team/:id`, { team: location.pathname.split("/")[2], id: location.pathname.split("/")[3] });
        
        const result =  axios.get(path);
        console.log(result);
        result.then(res => {
            res.data.map(item => {
                return (
                    form.setFieldsValue({
                        "team":location.pathname.split("/")[2],
                        "id": item.id,
                        "mct1": item.genes.mct1,
                    "ace": item.genes.ace,
                    "ppargc1a": item.genes.ppargc1a,
                    "ppara": item.genes.ppara,
                    "actn3": item.genes.actn3,
                    "nos3": item.genes.nos3,
                    "il6": item.genes.il6,
                    "bdnf": item.genes.bdnf,
                    "bdkbr2": item.genes.bdkbr2,
                    "col5a1": item.genes.col5a1,
                    "adrb2": item.genes.adrb2,
                    "col1a1": item.genes.col1a1,
                    "comt": item.genes.comt,
                    "hif1a": item.genes.hif1a,
                    "Status": item.Status
                })
                )
            })

        })
    }, [location.pathname,form]);

const onFinish = async(values) => {
    const newdata = {
        "genes": {
            "mct1": values.mct1,
            "ace": values.ace,
            "ppargc1a": values.ppargc1a,
            "ppara": values.ppara,
            "actn3": values.actn3,
            "nos3": values.nos3,
            "il6": values.il6,
            "bdnf": values.bdnf,
            "bdkbr2": values.bdkbr2,
            "col5a1": values.col5a1,
            "adrb2": values.adrb2,
            "col1a1": values.col1a1,
            "comt": values.comt,
            "hif1a": values.hif1a,

    },
    "Status": values.Status
    }

    await axios.post(`/update/${location.pathname.split("/")[2]}/${location.pathname.split("/")[3]}`, newdata).then(res => {
        success();
        navigate("/team/"+location.pathname.split("/")[2]);
    })
}


  return (
    <div>
        <Header/>
        <Form
            form={form}
            name="basic"
            layout='horizontal'
           
            onFinish={onFinish}
            wrapperCol={{ span: 4}}
                labelCol={{ span: 10 }}
            
        >
            <Form.Item 
                label="Team" 
                name="team"
                
                >
                <Input disabled />
            </Form.Item>
            <Form.Item
                label="ID"
                name="id"
                
                >
                <Input disabled/>
                </Form.Item>
                <Form.Item
                    label="mct1"
                    name="mct1"
                    
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="ace"
                    name="ace"
                    
                    >
                    <Input />

                </Form.Item>
                <Form.Item
                    label="ppargc1a"
                    name="ppargc1a"
                    
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="ppara"
                    name="ppara"
                    
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="actn3"
                    name="actn3"
                    
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="nos3"
                    name="nos3"
                    
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="il6"
                    name="il6"
                    
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="bdnf"
                    name="bdnf"
                    
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="bdkbr2"
                    name="bdkbr2"
                    
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="col5a1"
                    name="col5a1"
                    
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="adrb2"
                    name="adrb2"
                    
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="col1a1"
                    name="col1a1"
                    
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="comt"
                    name="comt"
                    
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="hif1a"
                    name="hif1a"
                    
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Status" name="Status"
                            
                
                >
                    <Select placeholder="Select a status">
                        <Select.Option value="Active">Active</Select.Option>
                        <Select.Option value="Inactive">Inactive</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 11, span: 4 }}>
                    <Button type="primary" htmlType='submit'>
                        Update
                    </Button>
                </Form.Item>
               
                
            
            </Form>
    </div>
  )
}

export default Updateteam