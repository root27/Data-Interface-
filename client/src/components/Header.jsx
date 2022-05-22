import React,{ useEffect} from 'react';
import "./Header.css";
import {generatePath, Link} from 'react-router-dom';
import axios from "axios"
import logo from "../UniqgeneLogo.png"


import {  Menu } from 'antd';

function Header() {
   
    const { SubMenu } = Menu;
    const [state, setState] = React.useState('home');
    const [data, setData] = React.useState([]);

    

    const handleClick = e => {
        console.log('click ', e);
        setState( e.key );
        
      };


    useEffect(() => {
        const result = axios.get("/get-user-data");
        result.then(res => {
            console.log(res);
            setData(res.data);
           
        })
    }, []);

    const result = data.filter(item => {
        return !item.TABLE_NAME.includes("personal")
    })

  return (
  <div className='header'>
    <img src={logo} alt="logo" className="logo"/>
    <Menu onClick={handleClick} selectedKeys={state} mode="horizontal">
        <Menu.Item key="home" >
            <Link to='/'>Home</Link>
          
        </Menu.Item>
        
        <Menu.Item key="add-team" >
            <Link to='/add-team'>Add team</Link>
        </Menu.Item>
        <Menu.Item key="add-data" >
            <Link to='/add-data'>Add data</Link>
        </Menu.Item>
        
        <SubMenu title="Select Team">
            {result.map(item => {
                return (
                    <Menu.Item key={item.TABLE_NAME}>
                        <Link to={generatePath("/team/:teamname", { teamname: item.TABLE_NAME })}>{item.TABLE_NAME}</Link>
                    </Menu.Item>

                            )
                            })}
        </SubMenu>
        
        
        <Menu.Item key="Personal">
            <Link to='/personal'>Personal</Link>
        </Menu.Item>
        
        
      </Menu>
     
  </div>
  );
}

export default Header;
