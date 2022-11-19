import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home";
import "@fontsource/public-sans";
import "./main.css";
import Projects from "./Projects";
import Organzier from "./Organizer";
import WaitForResponse from "./WaitForResponse";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Developer from "./Developer";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
const root = ReactDOM.createRoot(document.getElementById("root")!);

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

root.render(
  <div className="root-div">
    <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/projects" element={<Projects />} />
            <Route path="/organize" element={<Organzier />} />
            <Route path="/developer" element={<Developer />} />
            <Route path="/project/:projectId" element={<WaitForResponse />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </React.StrictMode>
  </div>
);
