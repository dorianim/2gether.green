import { Button } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

interface ProjectDetails {
  id: string;
  status: string;
  construction_time: number;
  cost_per_month: number;
  payoff_time: number;
  revenue_per_month: number;
  total_cost: number;
}


export default function WaitForResponse() {
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = React.useState<ProjectDetails>();

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
      </div>
    )
  );
}
