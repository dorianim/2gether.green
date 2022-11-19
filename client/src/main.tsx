import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home'
import '@fontsource/public-sans';
import './main.css'
import Projects from './Projects';
import Organzier from './Organizer';
import WaitForResponse from './WaitForResponse';
import { CssVarsProvider } from '@mui/joy/styles';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Developer from './Developer';
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <div className="root-div">
    <React.StrictMode>
      <Router>
      <Routes>
    
            <Route path="/projects" element={  <CssVarsProvider><Projects /> </CssVarsProvider>} />
           
          </Routes>
          <Routes>
    
            <Route path="/organize" element={  <CssVarsProvider><Organzier /> </CssVarsProvider>} />
           
          </Routes>
          <Routes>
    
            <Route path="/developer" element={  <CssVarsProvider><Developer /> </CssVarsProvider>} />
           
          </Routes>
          <Routes>
    
    <Route path="/submitted/waiting" element={  <CssVarsProvider><WaitForResponse /> </CssVarsProvider>} />
   
  </Routes>
          
          <Routes>
            <Route path="/" element={<CssVarsProvider><Home /> </CssVarsProvider>} />
          </Routes>
          
      </Router>
    </React.StrictMode>
  </div>
);  