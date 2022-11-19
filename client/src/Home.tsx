import { useState } from 'react'
import Button from '@mui/joy/Button';
import './Home.css';
import background from "../images/background.jpg";
import { CssVarsProvider } from '@mui/joy/styles';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <img src={background} alt="Image" />
      <h1>2getherGreen</h1>
      <CssVarsProvider>
      <Button variant="solid">Start</Button>
    </CssVarsProvider>
    </div>
  )
}

export default App
