import "./Home.css";
import { useNavigate } from "react-router-dom";
import { IconButton, Grid, TextField, Typography, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
function App() {
  const navigate = useNavigate();

  const handleStartOrganize = () => {
    navigate("/organize");
  };

  const handleStartJoin = () => {
    navigate("/join");
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
              Let's create clean energy together!
            </Typography>
          </Grid>
          <Grid item style={{ paddingTop: "15px" }}>
            <Typography variant="body1" component="div">
              Renewable and sustainable enery is more important than ever
              before. Our goal: make it easy for everyone to invest in clean
              energy projects.
            </Typography>
          </Grid>
          <Grid item style={{ width: "100%" }}>
            <div
              style={{
                alignItems: "left",
                width: "100%",
                paddingTop: "15px",
                marginLeft: "0",
              }}
            >
             
                <Button size="large" variant="contained" fullWidth onClick={handleStartOrganize}>
                  <Typography color={"black"}>Create your own project</Typography>
                </Button>
                <div style={{paddingTop: "8px"}}>
                  <Button size="large" variant="contained" fullWidth onClick={handleStartJoin}>
                  <Typography color={"black"}>Join other projects</Typography>
                </Button>
                </div>
                
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8} sx={{ paddingLeft: 6, marginTop: -1 }}>
        <img src="/images/photo1.png" style={{ width: "100%" }} />
      </Grid>
      <Divider variant="middle" />
      <div style={{ paddingTop: "100px", textAlign: "center" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CheckCircleOutlineOutlinedIcon
              sx={{ fontSize: 50, color: "lightgreen" }}
            />
            <h3>Defusing the energy crisis</h3>
            Through the promotion and through the simplification of the
            production of sustainable energy, cheap and clean energy can
            be guaranteed for everyone in the future!
          </Grid>
          <Grid item xs={4}>
            <CheckCircleOutlineOutlinedIcon
              sx={{ fontSize: 50, color: "lightgreen" }}
            />
            <h3>Counteracting climate change</h3>
            We promote the production of renewable energy by lowering the
            barriers and solving common problems!
          </Grid>
          <Grid item xs={4}>
            <CheckCircleOutlineOutlinedIcon
              sx={{ fontSize: 50, color: "lightgreen" }}
            />
            <h3>Invest in our future</h3>
            Investing in the production of sustainable energy always pays off,
            and particularly financially, thus offering an excellent investment
            in your financial future!
          </Grid>
        </Grid>
      </div>
      <div style={{ marginTop: "130px" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <img src="../images/landing_page_1.jpg" style={{ width: "100%" }} />
          </Grid>
          <Grid item xs={8}>
            <h2 style={{ marginTop: "0" }}>The problem</h2>
            Within the last 10 years, the price of electricity has risen by over
            70%. Renewable energy sources such as solar panels seem to be the
            solution both from an environmental and financial point of view. But
            unfortunately for most households in Germany, installing such a
            system is simply impossible. Only just over 42 percent have the
            opportunity to do so by living in their own home. Major challenges
            such as extensive research and calculations, unassessable risks,
            lack of financing options and more ensure that very few households
            actually decide to install a solar system. As a result, less than 9%
            of electricity generation in Germany comes from solar systems. Not
            to mention wind turbines: for private individuals, investing in a
            wind turbine is almost impossible due to financial, regulatory and
            space constraints.
          </Grid>
        </Grid>
      </div>
      <div style={{ marginTop: "130px" }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <h2>Our solution</h2>
            Our platform makes it super easy to invest in wind turbines and
            solar power plants, by bringing many people together until they can
            realize their own project! We take care of the financial assessment,
            data and forecasts. Try out our services by either joining an
            ongoing project or by making your own request for a collaborative
            project! You can invest as little as 100€ per month, but of course
            we also provide you with easy and uncomplicated contact to credit
            institutions to boost your investment! Most importantly, 
            you are all part of the project and YOU decide what will be done!
          </Grid>

          <Grid item xs={4}>
            <img src="../images/landing_page2.jpg" style={{ width: "100%" }} />
          </Grid>
        </Grid>
      </div>
      <div
        style={{
          marginTop: "130px",
          margin: "120px auto 40px auto",
          textAlign: "center",
        }}
      >
        <a href="https://github.com/dorianim/2gether.green" target="_blank">
          <IconButton>
            <div style={{ width: "30px", height: "30px" }}>
              <img
                src="../images/github.png"
                width={"100%"}
                height={"100%"}
              ></img>
            </div>
          </IconButton>
        </a>
        <a href="https://tum.social/about" target="_blank">
          <IconButton>
            <div style={{ width: "30px", height: "30px" }}>
              <img
                src="../images/mastodon.png"
                width={"100%"}
                height={"100%"}
              ></img>
            </div>
          </IconButton>
        </a>
        <br />
        Copyright © {new Date().getFullYear()}
      </div>
    </Grid>
  );
}

export default App;
