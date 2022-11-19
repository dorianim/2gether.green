import { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import background from "../images/background.jpg";
import { Chart } from "./Chart";
import { Button, Grid, TextField } from "@mui/material";
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
        <Grid container spacing={3} alignItems="flex-end">
          <Grid item>
            <TextField
              className="login-field"
              label="Username"
              variant="outlined"
            />
          </Grid>
          <Grid item>

            <TextField
              className="login-field"
              label="Password"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <Button
              className="login-button"
              variant="contained"
              onClick={handleStart}
            >
              Start
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
