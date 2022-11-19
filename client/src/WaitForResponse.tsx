import { Button, TextField } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

interface ProjectDetails {
  id?: string;
  status?: string;
  construction_time?: number;
  cost_per_month?: number;
  payoff_time?: number;
  revenue_per_month?: number;
  total_cost?: number;
}


export default function WaitForResponse() {
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = React.useState<ProjectDetails>();
  const amortisation = React.useRef(0)

  React.useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = async () => {
    fetch("http://localhost:8000/api/v1/project/" + projectId).then((response) => {
      if (response.ok) {
        return response.json();
      }
    }).then((data) => {
      setProjectDetails(data);
    });
  };

  const handleCalculate = async () => {
    fetch("http://localhost:8000/api/v1/project/" + projectId + "/morgage_rate?amortisation=" + amortisation.current).then((response) => {
      if (response.ok) {
        return response.json();
      }
    }).then((data) => {
      setProjectDetails({ ...projectDetails, cost_per_month: data.cost_per_month, payoff_time: data.payoff_time });
    });
  }

  const handleBeginFunding = async () => {
    fetch("http://localhost:8000/api/v1/project/" + projectId, {
      method: 'PATCH',
      body: JSON.stringify({
        status: 'funding',
        amortisation: amortisation
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
    }).then((data) => {
      // Redirect to FUNDING page
      setProjectDetails({ ...projectDetails, cost_per_month: data.cost_per_month, payoff_time: data.payoff_time });
    });
  }

  return (
    projectDetails?.status === "WaitingForApproval" ? 
    (<div>
      <h2>Success! We will check your request. </h2>
      <h3>
        This will may take a while. Please return to this page in a few days.
      </h3>
      <div className="submitButton">
        <Button variant="contained" onClick={handleRefresh}>
          Refresh
        </Button>
      </div>
    </div>) : (
      <div>
        <h2>Your project has been approved!</h2>
        <p>Here is some data about your Project: </p>
          <ul>
            <li>Construction time: {projectDetails?.construction_time}</li>
            <li>Cost per month: {projectDetails?.cost_per_month ?? "Please press calculate"}</li>
            <li>Payoff time: {projectDetails?.payoff_time ?? "Please press calculate"}</li>
            <li>Revenue per month: {projectDetails?.revenue_per_month}</li>
            <li>Total cost: {projectDetails?.total_cost}</li>
          </ul>
          <p> Please specify an amortisation rate:</p>
          <TextField
              className="login-field"
              label="Amortisation Rate"
              variant="outlined"
              onChange={(e) => amortisation.current = parseInt(e.target.value)}
              fullWidth
            />
          <Button variant="contained" onClick={handleCalculate}>Calculate</Button>
          <Button variant="contained" onClick={handleBeginFunding}>Begin funding</Button>
      </div>
    )
  );
}
