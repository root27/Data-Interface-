import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { generatePath, useLocation,useNavigate } from 'react-router-dom';
import {Modal, Button, Form,Input, Select} from 'antd';
import Header from '../components/Header'


const Update = () => {

    const navigation = useNavigate();
    const [form] = Form.useForm();
    const location = useLocation();
    const [countries,setCountries] = useState([]);
    
    function success() {
        Modal.success({
          content: 'Updated successfully',
        });
      }
   

      useEffect(async() => {
        const res =  await fetch("https://restcountries.com/v3.1/all")
        const veri = await res.json();
             console.log(veri);
           
             veri.sort((a,b) => {
                 return a.name.common > b.name.common ? 1 : -1
                })
                setCountries(veri);
               
             
     
      }, []);


    useEffect(() => {
        const path = generatePath("/get-personal/:id", { id: location.pathname.split("/")[2] });
        const result =  axios.get(path);
        result.then(res => {
            res.data.map(item => {
                return (
                form.setFieldsValue({
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
                    "Status": item.Status,
                    "country": item.country
        
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
            "Status": values.Status,
            "country" : values.country

        }
        

        
        await axios.post("/update-personal/" + location.pathname.split("/")[2], newdata).then(() => {

            

                success();
                navigation("/personal");
            
        
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
                label="ID"
                name="id"
                
                >
                <Input disabled/>
                </Form.Item>
                <Form.Item
                    label="Country"
                    name="country"
                    rules={[{ required: true, message: 'Please input country!' }]}
                >
                    
                    <Select placeholder="Please select a country">
                        {countries.map(item => {
                            return (
                                <Select.Option value={item.name.common}>{item.name.common}</Select.Option>
                            )
                        })}
                    </Select>
                        
                </Form.Item>
              
                <Form.Item
                    label="mct1"
                    name="mct1"
                    rules={[{ required: true, message: 'Please input gene name' }]}
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="AA">AA</Select.Option>
                        <Select.Option value="AT">AT</Select.Option>
                        <Select.Option value="TT">TT</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="ace"
                    name="ace"
                    
                    >
                    <Select placeholder="Select a value">
                        <Select.Option value="DD">DD</Select.Option>
                        <Select.Option value="ID">ID</Select.Option>
                        <Select.Option value="II">II</Select.Option>
                    </Select>

                </Form.Item>
                <Form.Item
                    label="ppargc1a"
                    name="ppargc1a"
                    rules={[{ required: true, message: 'Please input gene name' }]}
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="AA">AA</Select.Option>
                        <Select.Option value="AG">AG</Select.Option>
                        <Select.Option value="GG">GG</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="ppara"
                    name="ppara"
                    rules={[{ required: true, message: 'Please input gene name' }]}
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="CC">CC</Select.Option>
                        <Select.Option value="CG">CG</Select.Option>
                        <Select.Option value="GG">GG</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="actn3"
                    name="actn3"
                    rules={[{ required: true, message: 'Please input gene name' }]}
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="RR">RR</Select.Option>
                        <Select.Option value="RX">RX</Select.Option>
                        <Select.Option value="XX">XX</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="nos3"
                    name="nos3"
                    rules={[{ required: true, message: 'Please input gene name' }]}
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="TT">TT</Select.Option>
                        <Select.Option value="CT">CT</Select.Option>
                        <Select.Option value="CC">CC</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="il6"
                    name="il6"
                    rules={[{ required: true, message: 'Please input gene name' }]}
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="CC">CC</Select.Option>
                        <Select.Option value="GC">GC</Select.Option>
                        <Select.Option value="GG">GG</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="bdnf"
                    name="bdnf"
                    rules={[{ required: true, message: 'Please input gene name' }]}
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="GG">GG</Select.Option>
                        <Select.Option value="AG">AG</Select.Option>
                        <Select.Option value="AA">AA</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="bdkbr2"
                    name="bdkbr2"
                   
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="-18">-18</Select.Option>
                        <Select.Option value="0">0</Select.Option>
                        <Select.Option value="18">18</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="col5a1"
                    name="col5a1"
                    rules={[{ required: true, message: 'Please input gene name' }]}
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="CC">CC</Select.Option>
                        <Select.Option value="CT">CT</Select.Option>
                        <Select.Option value="TT">TT</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="adrb2"
                    name="adrb2"
                    rules={[{ required: true, message: 'Please input gene name' }]}
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="AA">AA</Select.Option>
                        <Select.Option value="GG">GG</Select.Option>
                        <Select.Option value="AG">AG</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="col1a1"
                    name="col1a1"
                    rules={[{ required: true, message: 'Please input gene name' }]}
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="GG">GG</Select.Option>
                        <Select.Option value="GT">GT</Select.Option>
                        <Select.Option value="TT">TT</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="comt"
                    name="comt"
                    rules={[{ required: true, message: 'Please input gene name' }]}
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="AA">AA</Select.Option>
                        <Select.Option value="AG">AG</Select.Option>
                        <Select.Option value="GG">GG</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="hif1a"
                    name="hif1a"
                    rules={[{ required: true, message: 'Please input gene name' }]}
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="CC">CC</Select.Option>
                        <Select.Option value="CT">CT</Select.Option>
                        <Select.Option value="TT">TT</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Status" name="Status">
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

export default Update