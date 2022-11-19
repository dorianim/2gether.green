import { useState } from 'react'
import Button from '@mui/joy/Button';
import './Home.css';
import { useNavigate } from "react-router-dom";
import background from "../images/background.jpg";

function App() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/projects");
  }

  const [count, setCount] = useState(0)

  return (
    <div className="App">

      <h1>2getherGreen</h1>
     
      <Button variant="solid" onClick={handleStart}>Start</Button>
    
    </div>
  )
}

export default App
