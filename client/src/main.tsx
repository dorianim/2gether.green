import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home";
import "@fontsource/public-sans";
import "./main.css";
import Projects from "./Projects";
import Organzier from "./Organizer";
import WaitForResponse from "./WaitForResponse";
import { CssVarsProvider } from "@mui/joy/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Developer from "./Developer";
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <div className="root-div">
    <React.StrictMode>
      <CssVarsProvider>
        <Router>
          <Routes>
            <Route path="/projects" element={<Projects />} />
            <Route path="/organize" element={<Organzier />} />
            <Route path="/developer" element={<Developer />} />
            <Route path="/project/:projectId" element={<WaitForResponse />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </CssVarsProvider>
    </React.StrictMode>
  </div>
);
