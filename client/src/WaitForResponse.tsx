import { Button, TextField } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Funding from "./Funding";
import CollapseAlert from "./CollapsableAlert";

export interface ProjectDetails {
  id?: string;
  status?: string;
  construction_time?: number;
  cost_per_month?: number;
  payoff_time?: number;
  revenue_per_month?: number;
  total_cost?: number;
  project_type?: string;
}

const projectDetailsMaps = {"construction_time": "Construction time", "cost_per_month": "Cost per month", "payoff_time": "Payoff time", "revenue_per_month": "Revenue per month", "total_cost": "Total cost" };


export default function WaitForResponse() {
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = React.useState<ProjectDetails>();
  const amortisation = React.useRef(0);
  const [success, setSuccess] = React.useState(true);

  console.log(projectDetailsMaps);

  React.useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = async () => {
    fetch("http://localhost:8000/api/v1/project/" + projectId).then(async (response) => {
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setProjectDetails(data);
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    }).catch((error) => {
      setSuccess(false);
    });
  };

  const handleCalculate = async () => {
    fetch("http://localhost:8000/api/v1/project/" + projectId + "/morgage_rate?amortisation=" + amortisation.current).then(async (response) => {
      if (response.ok) {
        let data = await response.json();
        setProjectDetails({ ...projectDetails, cost_per_month: data.cost_per_month, payoff_time: data.payoff_time });
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    }).catch((error) => {
      setSuccess(false);
    });
  }

  const handleBeginFunding = async () => {
    fetch("http://localhost:8000/api/v1/project/" + projectId, {
      method: 'PATCH',
      body: JSON.stringify({
        status: 'Funding',
        amortisation: amortisation.current
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(async (response) => {
      console.log(response);
      if (response.ok) {
        // let data = await response.json();
        setProjectDetails({ ...projectDetails, status: "Funding" });  
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    }).catch((error) => {
      setSuccess(false);
    });
  }

  return (
    <>
      <CollapseAlert
        error={{
          open: !success,
          severity: "error",
          message: "Something went wrong. Please try again later.",
        }}
        onClose={() => setSuccess(!success)}
      />
      { projectDetails?.status === "WaitingForApproval" ?
      ( <div>
        <h2>Success! We will check your request. </h2>
        <h3>
          This will may take a while. Please return to this page in a few days.
        </h3>
        <div className="submitButton">
          <Button variant="contained" onClick={handleRefresh}>
            Refresh
          </Button>
        </div>
      </div>) : projectDetails?.status === "Approved" ? (
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
      ) : projectDetails?.status === "Funding" ? (
        <Funding projectDetails={projectDetails} projectDetailsMaps={projectDetailsMaps}></Funding>
      ) : (
      <div>
        <h2>Sorry, your project has been rejected.</h2>
      </div>
      )}
    </>
  );
}
