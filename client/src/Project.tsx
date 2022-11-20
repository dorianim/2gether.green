import "./Projects.css";
import * as React from "react";
import { Box, Button, LinearProgress, Slider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ProjectProps {
  project: Project;
}
interface Project {
  project_type?: string;
  progress: number;
  participants: number;
  total_cost: number;
  handleInvestmentChange: (amount: number) => void;
}

const marks = [
  {
    value: 100,
    label: "100€",
  },
  {
    value: 500,
    label: "500€",
  },
  {
    value: 1000,
    label: "1000€",
  },
  {
    value: 1500,
    label: "1500€",
  },
  {
    value: 2000,
    label: "2000€",
  },
];

function valueText(value: number) {
  return `${value}€`;
}


export default function Project(props: ProjectProps) {
  const project: Project = props.project;
  const [progress, setProgress] = React.useState(props.project.progress);
  const investment = React.useRef(100);
  const navigate = useNavigate();
  
  function handleSubmit() {
    let newProgress = investment.current / project.total_cost * 100;
    setProgress(progress + newProgress);
    localStorage.setItem("progress", progress + newProgress + "");
    navigate("/thanks");
  }

  return (
    <div style={{marginTop: "10px"}}>
      <Typography variant="h5">
        {project.project_type}
      </Typography>
      <LinearProgress style={{marginBottom: "16px"}} variant="determinate" value={progress}></LinearProgress>
      <Typography>Progress: {progress.toFixed(2)}%&nbsp;Participants: {project.participants}</Typography>
      <Typography>How much do you want to invest? (monthly) </Typography>
      <Box>
        <Slider
          aria-label="Custom marks"
          defaultValue={20}
          getAriaValueText={valueText}
          step={10}
          valueLabelDisplay="auto"
          marks={marks}
          onChange={(event, value) => {
            props.project.handleInvestmentChange(value as number);
            return investment.current = value as number
          }}
          style={{ width: "100%" }}
          min={100}
          max={2000}
        />
      </Box>
      <div className="submitButton">
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
