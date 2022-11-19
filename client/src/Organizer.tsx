import React from "react";
import { useState } from "react";
import { TextField, Button } from "@mui/joy/";
import Autocomplete from "@mui/joy/Autocomplete";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/joy/Alert";
import IconButton from '@mui/joy/IconButton';
import ReportIcon from '@mui/icons-material/Report';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Typography from '@mui/joy/Typography';
import "./Organizer.css";
//postleitzahl
//typ

export default function Organzier() {
  const [zipCode, setZipCode] = useState(0);
  const [category, setCategory] = useState("");
 const [success, setSuccess] = useState(true);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    let successful : boolean = true;
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
    )
    if (!response.ok){
     successful = false;
    }
    } catch (e) {
      console.log(e);
      successful = false;
    }
    console.log()
    
    
    if (!successful){
      setSuccess(false);
    }
    if (successful) {
      navigate("/submitted/waiting");
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
        <Autocomplete
          options={["Windmill", "Solar power plant"]}
          onChange={(e, value) => setCategory(value ?? "")}
        />
      </div>

      <div className="submitButton">
        <Button variant="solid" onClick={handleSubmit}>
          Request offer
        </Button>
      </div>
      {success === false && <Alert
          key={"Error"}
          sx={{ alignItems: 'flex-start' }}
          startDecorator={React.cloneElement(<ReportIcon />, {
            sx: { mt: '2px', mx: '4px' },
            fontSize: 'xl2',
          })}
          variant="soft"
          color={'danger'}
          endDecorator={
            <IconButton variant="soft" size="sm" color={'danger'} onClick={() => {setSuccess(true);}}>
              <CloseRoundedIcon />
            </IconButton>
          }
        >
          <div>
            <Typography fontWeight="lg" mt={0.25}>
              {"Error"}
            </Typography>
            <Typography fontSize="sm" sx={{ opacity: 0.8 }}>
              An Error occured :/
            </Typography>
          </div>
        </Alert>}
    </div>
  );
}
