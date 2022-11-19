import {
  AppBar,
  Toolbar,
  Stepper,
  Step,
  Box,
  Container,
  StepButton,
  Typography,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./Header.css";

/**
 * Creates a Header Component that displays the reservation steps
 * @return {JSX.Element}
 */
export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const routes = ["/", "/organize", "/project"];

  useEffect(() => {
    const index = routes.indexOf(
      routes.filter((el) => location.pathname.includes(el)).at(-1) ?? ""
    );

    setStep(index >= 0 ? index : 0);
  }, [location]);

  const steps = ["Organize", "Finance"];
  return (
    <AppBar
      position="sticky"
      sx={{
        display: location.pathname === "/" ? "none" : undefined,
        background: "#ffffff",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar className="header-container">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <h2>
              2gether.<span style={{ color: "lightgreen" }}>green</span>
            </h2>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            .
          </Typography>
          <img src="/images/oekostrom.svg" style={{ height: "50px" }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
