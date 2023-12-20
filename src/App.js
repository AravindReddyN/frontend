
import './App.css';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Home from './pages/Home.js';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
// import { userContextProvider } from '../context/userContext.js';

// axios.defaults.baseURL="http://localhost:8000"
axios.defaults.baseURL="https://backend-1wi2.onrender.com"
axios.defaults.withCredentials=true
function App() {
  return (
    <>
      <Router>
        <Toaster position='top-center' toastOptions={{duration:2000}}></Toaster>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/Register" element={<Register />}></Route>
          <Route exact path="/Home" element={<Home />}></Route>
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
