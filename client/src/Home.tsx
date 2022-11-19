import "./Home.css";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField, Typography } from "@mui/material";
function App() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/organize");
  };

  return (
    <Grid container>
      <Grid
        item
        xs={4}
        sx={{
          paddingTop: 8,
        }}
      >
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography variant="h2" component="div">
              Let's create clean enegery together!
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" component="div">
              Renewable and sustainable enery is more important than ever
              before. Our goal: make it easy for everyone to invest in clean
              energy projects.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8} sx={{ paddingLeft: 6, marginTop: -1 }}>
        <img
          src="/images/photo1.png"
          style={{ width: "100%", borderRadius: "5px" }}
        />
      </Grid>
    </Grid>
  );
}

export default App;
