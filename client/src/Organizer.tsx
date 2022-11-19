import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportIcon from "@mui/icons-material/Report";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./Organizer.css";
import {
  Alert,
  Autocomplete,
  AutocompleteRenderInputParams,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CollapsableAlert from "./CollapsableAlert";

export default function Organzier() {
  const [zipCode, setZipCode] = useState(0);
  const [category, setCategory] = useState("");
  const [success, setSuccess] = useState(true);

  const navigate = useNavigate();
  const handleSubmit = async () => {
    let successful: boolean = true;
    let respBody;
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        zip_code: zipCode,
        project_type: category === "Wind" ? "Wind" : "Solar",
      }),
    };
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/project/",
        requestOptions
      );
      if (!response.ok) {
        successful = false;
      }
      respBody = await response.json();
    } catch (e) {
      console.log(e);
      successful = false;
    }
    console.log();

    if (!successful) {
      setSuccess(false);
    }
    if (successful) {
      navigate("/project/" + respBody.id);
    }
  };

  return (
    <Grid
      container
      sx={{
        paddingTop: 2,
        justifyContent: "center",
        width: "50%",
        alignSelf: "center",
        margin: "auto",
      }}
      spacing={2}
    >
      <Grid item xs={12} sx={{ alignItems: "center", marginTop: "-12rem" }}>
        <img
          src="/images/photo4.jpg"
          style={{ width: "100%", borderRadius: "4rem" }}
        />
      </Grid>

      <Grid item xs={12} sx={{ paddingBottom: 2, textAlign: "center" }}>
        <Typography variant="h4">Organize a project</Typography>
      </Grid>

      <Grid item xs={12} sx={{ paddingBottom: 2 }}>
        <Typography variant="body1">
          To get started with your sustainble energy project, please enter your
          Zip code and the type of projoct you wish to establish, below. One of
          our experts will take a look at your location and assess wether it is
          feasible. They will then get back to you with more details about the
          project.
        </Typography>
      </Grid>

      <Grid item xs={12} sx={{ paddingBottom: 2 }}>
        <CollapsableAlert
          error={{
            open: !success,
            severity: "error",
            message: "Something went wrong. Please try again later.",
          }}
          onClose={() => setSuccess(true)}
        />
      </Grid>

      <Grid item xs={12} sx={{ paddingBottom: 2 }}>
        <TextField
          label="Zip code"
          placeholder="00000"
          type="number"
          onChange={(e) => setZipCode(parseInt(e.target.value))}
          fullWidth
          required
        />
      </Grid>

      <Grid item xs={12} sx={{ paddingBottom: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="category-select-label">Category</InputLabel>

          <Select
            labelId="category-select-label"
            onChange={(e) => setCategory(e.target.value as string)}
            label="Category"
            fullWidth
          >
            <MenuItem value="Windturbine">Wind turbine</MenuItem>
            <MenuItem value="Solar">Solar panel</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sx={{ paddingBottom: 2 }}>
        <Button variant="contained" onClick={handleSubmit}>
          Request offer
        </Button>
      </Grid>
    </Grid>
  );
}
