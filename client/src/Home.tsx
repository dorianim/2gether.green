import { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import background from "../images/background.jpg";
import { Chart } from "./Chart";
import { Button, TextField } from "@mui/material";
function App() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/projects");
  };

  return (
    <div className="App">
      <div className="login-container">
        <h1>
          2gether.<span style={{ color: "lightgreen" }}>green</span>
        </h1>
        <TextField
          className="login-field"
          label="Username"
          variant="outlined"
        />
        <TextField
          className="login-field"
          label="Password"
          variant="outlined"
        />
        <Button
          className="login-button"
          variant="contained"
          onClick={handleStart}
        >
          Start
        </Button>
      </div>
    </div>
  );
}

export default App;
