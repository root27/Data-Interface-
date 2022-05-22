import React,{useEffect} from 'react'
import "./Listteam.css"
import Header from '../components/Header'
import axios from 'axios';

import {generatePath, Link} from 'react-router-dom'
import {Modal, Button, Space,Table,message } from 'antd';
import {CSVLink} from 'react-csv';

const key = 'updatable';

const openMessage = () => {
  message.loading({ content: 'Creating...', key , duration: 4 });
  
  
};


function success() {
    Modal.success({
      content: 'Pdf created successfully',
    });
  }


function error() {
    Modal.error({
      title: 'This is an error message',
      content: 'Pdf not created',
    });
  }


const Listpersonal = () => {

    
    const [data, setData] = React.useState([]);
    
      
    const {Column} = Table;


    useEffect(() => {
      
        
        const result = axios.get("/personal");
        result.then(res => {
            
            setData(res.data);
            
        })
    
  }, []);

  const datatable = data.map(item => {

    return (
        {
          key: item.id,
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
          "Status" : item.Status,
          
          }
    )
})



  return (
    <div className='list-container'>
        <div className="header-container">
            <Header/>
        </div>
        
    <h1>Personal</h1>
        <div className='table-container'>
        <Table dataSource={datatable}>
                    <Column title="ID" dataIndex="id" key="id" />
                    
                    
                        <Column title="MCT1" dataIndex="mct1" key="mct1" align="center" />
                       {/* <Column title="ACE" dataIndex="ace" key="ace" align="center" />*/}
                        <Column title="PPARGC1A" dataIndex="ppargc1a" key="ppargc1a" align="center" />
                        <Column title="PPARA" dataIndex="ppara" key="ppara" align="center" />
                        <Column title="ACTN3" dataIndex="actn3" key="actn3" align="center" />
                        <Column title="NOS3" dataIndex="nos3" key="nos3" align="center" />
                        <Column title="IL6" dataIndex="il6" key="il6" align="center"/>
                        <Column title="BDNF" dataIndex="bdnf" key="bdnf" align="center"/>
                        {/*<Column title="BDKBR2" dataIndex="bdkbr2" key="bdkbr2" align="center"/>*/}
                        <Column title="COL5A1" dataIndex="col5a1" key="col5a1" align="center"/>
                        <Column title="ADRB2" dataIndex="adrb2" key="adrb2" align="center"/>
                        <Column title="COL1A1" dataIndex="col1a1" key="col1a1" align="center"/>
                        <Column title="COMT" dataIndex="comt" key="comt" align="center"/>
                        <Column title="HIF1A" dataIndex="hif1a" key="hif1a" align="center"/>
                    
                    <Column title="Actions" key="action" align="center" render={(text, record) => (
                        <Space size="middle">
                            <Link to={generatePath("/edit-personal/:id",{id: record.id})}>Edit</Link>
                            
                            <Button type="danger" onClick={() => {
                                axios.delete(`/delete-personal/${record.id}`)
                                .then(() => {
                                    setData(data.filter(item => item.id !== record.id))
                                })
                            } }>Delete</Button>
                            <Button disabled={record.Status === "Active" ? false : true} type = "primary" onClick={
                                () => {
                                    axios.get(`/pdf-personal/${record.id}`,{
                                        responseType: 'blob'
                                    }
                                    )
                                    .then(res => {
                                        const file = new Blob([res.data], {type: 'application/pdf'});
                                        const fileURL = URL.createObjectURL(file);
                                        window.open(fileURL);
                                    })
                                }
                            }>PDF</Button>
                        </Space>
                    )} />
                    <Column title="Status" key="Status" align="center" dataIndex="Status" render={(text, record) => (
                        record.Status === "Active" ? <span> ✔  </span> : <span>❌ </span>
                    )} />
                    <Column title="Report" key = "Report" align="center" render={(text, record) => (
                        <Space size="middle">
                            <Button disabled={record.Status === "Active" ? false : true} type="primary" onClick={
                                () => {
                                    axios.get(`/create-personal-report/${record.id}`).then(
                                    openMessage()).then(res => {
                                        
                                       if(res.data === "Success"){
                                             success();
                                        }
                                        else{
                                            error();
                                        }

                                    })}
                            }>
                                Create Report
                            </Button>
                        </Space>
                    )} />

                </Table>
                <CSVLink data={datatable} filename={`personal-data.csv`}>
                <Button type='primary' className='download-button'>Download</Button>
                </CSVLink>

        </div>
  </div>
)
}


export default Listpersonal;