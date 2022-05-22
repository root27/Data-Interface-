import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';



export default function useAuth() {
   const navigate = useNavigate();
   const { setUser } = useContext(UserContext);
   const [error, setError] = useState(null);
   //set user in context and push them home
   const setUserContext = async () => {

    await axios.get("/user").then(res => {
       console.log(res)
       setUser(res.data.currentUser);
       navigate('/');
     }).catch((err) => {
       setError(err.response.data);
   })
  }
//register user
  const registerUser = async (data) => {
     const { username, password } = data;
     return axios.post(`auth/register`, {
        username, password
     }).then(async () => {
         await setUserContext();
     }).catch((err) => {
         setError(err.response.data);
      })
    };


//login user
const loginUser = async (data) => {
    
    const { username, password } = data;
        return axios.post(`/auth/login`, {
           username, password
        }).then(async () => {
            await setUserContext();
        })
        .catch((err) => {
            setError(err.response.data);
        }
        )
 };


return {
   registerUser,
   loginUser,
   error
   }
}