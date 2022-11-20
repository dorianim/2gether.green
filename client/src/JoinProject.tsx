import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportIcon from "@mui/icons-material/Report";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { BASE_URL } from "./Api";
import "./Organizer.css";
import {
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CollapsableAlert from "./CollapsableAlert";

interface Results {
  id: number;
  status: string;
  zip_code: number;
  project_type: string;
}


export default function JoinProject() {
  const [zipCode, setZipCode] = useState(0);
  const [success, setSuccess] = useState(true);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const navigate = useNavigate();
  const handleSearch = async () => {
    let successful: boolean = true;
    let respBody;
    try {
      const response = await fetch(
        `${BASE_URL}/project/`
      );
      if (!response.ok) {
        successful = false;
      }
      respBody = await response.json();
    } catch (e) {
      console.log(e);
      successful = false;
    }

    if (!successful) {
      setSuccess(false);
    } else {
      let resultsFiltered = respBody.filter((result: Results) => result.zip_code === zipCode);
      if (resultsFiltered.length > 0){
        setNoResultsFound(
          false
        );
        navigate(`/project/${resultsFiltered[0].id}`);
      } else {
        setNoResultsFound (true);
      }
      

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
    >
      <Grid item xs={12} sx={{ paddingBottom: 2, textAlign: "center" }}>
        <Typography variant="h4">Search for a project in your area</Typography>
      </Grid>

      <Grid item xs={12} sx={{ paddingBottom: 2 }}>
        <Typography variant="body1">
          To find other projects, enter a zip code from your area.
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
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Grid>
      {noResultsFound && (
        
          <div style={{ textAlign: "left" }}>
            <h3>No results for this zip code found :/</h3>
          </div> 
      )}
    </Grid>
  );
}
