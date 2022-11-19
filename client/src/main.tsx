import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <div className="root-div">
    <React.StrictMode>
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
      </Router>
    </React.StrictMode>
  </div>
);  