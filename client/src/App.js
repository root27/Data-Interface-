import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './Pages/Home';
import Add from './Pages/Add';
import Listteam from './Pages/Listteam';
import Listpersonal from './Pages/Listpersonal';
import Update from './Pages/Update';
import Addteam from "./Pages/Addteam";
import Updateteam from "./Pages/Updateteam";
import Login from './Pages/Login';
import {UserContext} from './hooks/UserContext';
import useFindUser from "./hooks/useFindUser";
import PrivateRoute from "./components/PrivateRoute";

function App() {

  const {user, setUser} = useFindUser();




  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{user, setUser}}>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
            }  />
            <Route path="/add-data" element={
            <PrivateRoute>
              <Add />
            </PrivateRoute>
            } /> 
            
            <Route path = "/add-team" element={<PrivateRoute><Addteam /></PrivateRoute>} />
            <Route path = "/team/:teamname" element={<PrivateRoute><Listteam /></PrivateRoute>} />
            <Route path = "/personal" element={<PrivateRoute><Listpersonal /></PrivateRoute>} />
            <Route path = "/edit-personal/:id" element={<PrivateRoute><Update /></PrivateRoute>} />
            <Route path="/edit/:team/:id" element={<PrivateRoute><Updateteam /></PrivateRoute>} />
          </Routes>
        </UserContext.Provider>
      </Router>
     
    </div>

  ); 
}

export default App;
