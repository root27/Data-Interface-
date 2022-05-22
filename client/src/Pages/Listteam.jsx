import React, { useEffect } from 'react'
//import "./Listteam.css"
import { Link,useLocation,generatePath } from 'react-router-dom';
import axios from 'axios';
import { Button, Space,Table } from 'antd';
import {CSVLink} from 'react-csv';
import Header from '../components/Header'


const Listteam = () => {
    const location = useLocation();
    const [data, setData] = React.useState([]);
    const [team, setTeam] = React.useState("");
      
    const {Column} = Table;



    useEffect(() => {
      
          const path = generatePath("/team/:teamname", { teamname: location.pathname.split("/")[2] });
          const result = axios.get(path);
          result.then(res => {
              
              setData(res.data);
              setTeam(decodeURI(location.pathname.split("/")[2]));
              
          })
      
    }, [location]);



    const datatable = data.map(item => {

        return (
            {
              key: item.id,
              "id": item.id,
              "name" : item.name,
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
              "Status" : item.Status
              }
        )
    })



  return (
    <div className='list-container'>
      <div className="header-container">
        <Header/>
      </div>
      <h1>
        {team}
      </h1>
      <div className='table-container'>
        <Table dataSource={datatable}>
                  <Column title="ID" dataIndex="id" key="id" />
                  
                      <Column title="MCT1" dataIndex="mct1" key="mct1" />
                      <Column title="ACE" dataIndex="ace" key="ace" />
                      <Column title="PPARGC1A" dataIndex="ppargc1a" key="ppargc1a" />
                      <Column title="PPARA" dataIndex="ppara" key="ppara" />
                      <Column title="ACTN3" dataIndex="actn3" key="actn3" />
                      <Column title="NOS3" dataIndex="nos3" key="nos3" />
                      <Column title="IL6" dataIndex="il6" key="il6" />
                      <Column title="BDNF" dataIndex="bdnf" key="bdnf" />
                      <Column title="BDKBR2" dataIndex="bdkbr2" key="bdkbr2" />
                      <Column title="COL5A1" dataIndex="col5a1" key="col5a1" />
                      <Column title="ADRB2" dataIndex="adrb2" key="adrb2" />
                      <Column title="COL1A1" dataIndex="col1a1" key="col1a1" />
                      <Column title="COMT" dataIndex="comt" key="comt" />
                      <Column title="HIF1A" dataIndex="hif1a" key="hif1a" />
                  
                  <Column title="Actions" key="action" render={(text, record) => (
                      <Space size="middle">
                         <Link to={generatePath(`/edit/${decodeURI(location.pathname.split("/")[2])}/:id`,{ id: record.id})}>Edit</Link>
                          
                          <Button type="danger" onClick={() => {
                             
                                 axios.delete(`/delete/${team}/${record.id}`)
                              .then(() => {
                                  setData(data.filter(item => item.id !== record.id))
                              })
                          }
                          }>Delete</Button>
                      </Space>
                  )} />
                  <Column title="Status" key="status" render={(text, record) => (
                      record.Status === "Active" ? <span>✔  </span> : <span>❌ </span>
                  )} />

              </Table>
              <CSVLink data={datatable} filename={`${team}-data.csv`}>
                <button className='download-button'>Download</button>
              </CSVLink>

        </div>
    </div>
  )
}

export default Listteam