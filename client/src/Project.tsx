import "./Projects.css";
import * as React from "react";
import { Box, Button, LinearProgress, Slider } from "@mui/material";

interface ProjectProps {
  project: Project;
}
interface Project {
  name: string;
  progress: number;
  participants: number;
}

const marks = [
  {
    value: 10,
    label: "10€",
  },
  {
    value: 50,
    label: "50€",
  },
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

function handleSubmit() {
  //TODO
}

export default function Project(props: ProjectProps) {
  const project: Project = props.project;
  const [progress, setProgress] = React.useState(25);
  return (
    <div>
      {" "}
      <div className="projectName">
        <strong>{project.name}</strong>
      </div>
      <LinearProgress value={progress}></LinearProgress>
      Progress: {project.progress}%<br />
      Participants: {project.participants}
      <br />
      How much do you want to invest? (monthly)
      <Box sx={{ width: 300 }}>
        <Slider
          aria-label="Custom marks"
          defaultValue={20}
          getAriaValueText={valueText}
          step={10}
          valueLabelDisplay="auto"
          marks={marks}
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
