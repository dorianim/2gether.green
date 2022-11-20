import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home";
import "@fontsource/public-sans";
import "./main.css";
import Projects from "./Projects";
import Organzier from "./Organizer";
import WaitForResponse from "./WaitForResponse";
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Routes,
} from "react-router-dom";
import Developer from "./Developer";
import PageContainer from "./PageContainer";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { lightGreen } from "@mui/material/colors";
import Header from "./Header";
import Thanks from "./Thanks";
import JoinProject from "./JoinProject";
const root = ReactDOM.createRoot(document.getElementById("root")!);

export const darkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#90EE90",
    },
  },
});

root.render(
  <div className="root-div">
    <React.StrictMode>
      <HashRouter>
        <Header />
        <PageContainer>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Routes>
              <Route path="/projects" element={<Projects />} />
              <Route path="/organize" element={<Organzier />} />
              <Route path="/developer" element={<Developer />} />
              <Route path="/join" element={<JoinProject />} />
              <Route path="/project/:projectId" element={<WaitForResponse />} />
              <Route path="/thanks" element={<Thanks />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </ThemeProvider>
        </PageContainer>
      </HashRouter>
    </React.StrictMode>
  </div>
);
