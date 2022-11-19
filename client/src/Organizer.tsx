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
  IconButton,
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
        project_type: category === "Windmill" ? "Wind" : "Solar",
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
      navigate("/project/"+ respBody.id);
    }
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <h2>Please enter some details:</h2>
      <TextField
        label="Zip code"
        placeholder="00000"
        type="number"
        onChange={(e) => setZipCode(parseInt(e.target.value))}
        fullWidth
        required
      />
      <div className="select">
        Category:
        <Select onChange={(e) => setCategory(e.target.value as string)}>
          <MenuItem value="Windmill">Windmill</MenuItem>
          <MenuItem value="Solar">Solar panel</MenuItem>
        </Select>
      </div>

      <div className="submitButton">
        <Button variant="contained" onClick={handleSubmit}>
          Request offer
        </Button>
      </div>

      <CollapsableAlert
        error={{
          open: !success,
          severity: "error",
          message: "Something went wrong. Please try again later.",
        }}
        onClose={() => setSuccess(true)}
      />
    </div>
  );
}
