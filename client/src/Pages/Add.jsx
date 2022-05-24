import React, { useEffect,useState } from 'react';
import axios from 'axios';
import {Modal, Button, Form, Select,Input} from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'


const Add = () => {

    const [data,setData] = useState([]);
    const [countries,setCountries] = useState([]);

    const navigation = useNavigate();

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
        const result = axios.get("/get-user-data");
        result.then(res => {
            console.log(res);
            setData(res.data);
        })
    }, []);

    function success() {
        Modal.success({
          content: 'Data added successfully',
        });
      }

    const onFinish = async(values) => {
        
        if(values.team === "personal"){
            const data = {
                "id": values.id,
                
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
                "sport_type": values.sport_type,
                "country" : values.country
               
        }
        await axios.post('/add-personal', data).then(res => {
        
            res.data === "Success" ? success() : console.log(res.data); 
        navigation("/personal");
       
        }
        )
        }
        else{
        
        
            const data = {
                "name" : values.team,
                "id": values.id,
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
                "sport_type": values.sport_type,
                "country" : values.country
                
            }
            
            const result = await axios.post("/add-team", data);
            result.data === "Success" ? success() : alert("Error");
        }
    
                
    }  
    


return( 
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
                    <Select placeholder="Select a team">
                        {data.map(item => {
                            return (
                            <Select.Option value={item.TABLE_NAME}>{item.TABLE_NAME}</Select.Option>
                            )
                        })}
                       
                        
                    </Select>
                </Form.Item>

                <Form.Item
                    label="ID"
                    name="id"
                    rules={[{ required: true, message: 'Please input ID!' }]}
                >
                    <Input />
                </Form.Item>
                
                <Form.Item
                    label="Country"
                    name="country"
                    rules={[{ required: true, message: 'Please input country!' }]}
                >
                    
                   <Select placeholder="Select a country">
                        {countries.map(country => {
                            return (
                            <Select.Option value={country.name.common}>{country.name.common}</Select.Option>
                            )
                        })}

                    </Select>
                        
                </Form.Item>
              
                <Form.Item
                    label="mct1"
                    name="mct1"
                   
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="AA">AA</Select.Option>
                        <Select.Option value="AT">AT</Select.Option>
                        <Select.Option value="TT">TT</Select.Option>
                        <Select.Option value="" >Yok</Select.Option>
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
                        <Select.Option value="" >Yok</Select.Option>
                    </Select>

                </Form.Item>
                <Form.Item
                    label="ppargc1a"
                    name="ppargc1a"
                    
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="AA">AA</Select.Option>
                        <Select.Option value="AG">AG</Select.Option>
                        <Select.Option value="GG">GG</Select.Option>
                        <Select.Option value="" >Yok</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="ppara"
                    name="ppara"
                    
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="CC">CC</Select.Option>
                        <Select.Option value="CG">CG</Select.Option>
                        <Select.Option value="GG">GG</Select.Option>
                        <Select.Option value="" >Yok</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="actn3"
                    name="actn3"
                    
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="RR">RR</Select.Option>
                        <Select.Option value="RX">RX</Select.Option>
                        <Select.Option value="XX">XX</Select.Option>
                        <Select.Option value="" >Yok</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="nos3"
                    name="nos3"
                    
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="TT">TT</Select.Option>
                        <Select.Option value="CT">CT</Select.Option>
                        <Select.Option value="CC">CC</Select.Option>
                        <Select.Option value="" >Yok</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="il6"
                    name="il6"
                    
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="CC">CC</Select.Option>
                        <Select.Option value="GC">GC</Select.Option>
                        <Select.Option value="GG">GG</Select.Option>
                        <Select.Option value="" >Yok</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="bdnf"
                    name="bdnf"
                    
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="GG">GG</Select.Option>
                        <Select.Option value="AG">AG</Select.Option>
                        <Select.Option value="AA">AA</Select.Option>
                        <Select.Option value="" >Yok</Select.Option>
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
                        <Select.Option value="" >Yok</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="col5a1"
                    name="col5a1"
                    
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="CC">CC</Select.Option>
                        <Select.Option value="CT">CT</Select.Option>
                        <Select.Option value="TT">TT</Select.Option>
                        <Select.Option value="" >Yok</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="adrb2"
                    name="adrb2"
                    
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="AA">AA</Select.Option>
                        <Select.Option value="GG">GG</Select.Option>
                        <Select.Option value="AG">AG</Select.Option>
                        <Select.Option value="" >Yok</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="col1a1"
                    name="col1a1"
                    
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="GG">GG</Select.Option>
                        <Select.Option value="GT">GT</Select.Option>
                        <Select.Option value="TT">TT</Select.Option>
                        <Select.Option value="" >Yok</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="comt"
                    name="comt"
                    
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="AA">AA</Select.Option>
                        <Select.Option value="AG">AG</Select.Option>
                        <Select.Option value="GG">GG</Select.Option>
                        <Select.Option value="" >Yok</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="hif1a"
                    name="hif1a"
                    
                >
                    <Select placeholder="Select a value">
                        <Select.Option value="CC">CC</Select.Option>
                        <Select.Option value="CT">CT</Select.Option>
                        <Select.Option value="TT">TT</Select.Option>
                        <Select.Option value="" >Yok</Select.Option>
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
                        Submit
                    </Button>
                </Form.Item>
               
                
            
            </Form>
    </div>
  )
  
}

export default Add;
