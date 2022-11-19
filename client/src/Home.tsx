import { useState } from 'react'
import Button from '@mui/joy/Button';
import './Home.css';
import { useNavigate } from "react-router-dom";
import background from "../images/background.jpg";
import { Chart } from './Chart';
import TextField from '@mui/joy/TextField';
function App() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/projects");
  }

  return (
    <div className="App">

      <div className='login-container'>
        <h1>2gether.<span style={{color: "lightgreen"}}>green</span></h1>
        <TextField className="login-field" label="Username" variant="outlined" />
        <TextField className="login-field" label="Password" variant="outlined" />
        <Button className="login-button" variant="solid" onClick={handleStart}>Start</Button>
      </div>
    
    </div>
  )
}

export default App
