import "./Home.css";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField } from "@mui/material";
function App() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/organize");
  };

  return (
    <div className="App">
      <div className="login-container">
        <Grid container alignItems="flex-end" sx={{ width: "100%" }}>
          <Grid item xs={12} sx={{ paddingBottom: 2 }}>
            <h1>
              2gether.<span style={{ color: "lightgreen" }}>green</span>
            </h1>
          </Grid>
          <Grid item xs={12} sx={{ paddingBottom: 2 }}>
            <TextField
              className="login-field"
              label="Username"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ paddingBottom: 2 }}>
            <TextField
              className="login-field"
              label="Password"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ paddingBottom: 2 }}>
            <Button
              className="login-button"
              variant="contained"
              onClick={handleStart}
              fullWidth
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
