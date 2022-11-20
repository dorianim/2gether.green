import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Funding from "./Funding";
import CollapseAlert from "./CollapsableAlert";
import InReview from "./InReview";
import FundingConfiguration from "./FundingConfigutation";
import { BASE_URL } from "./Api";

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

const projectDetailsMaps = {
  construction_time: "Construction time",
  cost_per_month: "Cost per month",
  payoff_time: "Payoff time",
  revenue_per_month: "Revenue per month",
  total_cost: "Total cost",
};

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
    fetch(`${BASE_URL}/project/${projectId}`)
      .then(async (response) => {
        if (response.ok) {
          let data = await response.json();
          console.log(data);
          setProjectDetails(data);
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      })
      .catch((error) => {
        setSuccess(false);
      });
  };

  const handleCalculate = async () => {
    fetch(
      `${BASE_URL}/${projectId}/morgage_rate?amortisation=${amortisation.current}`
    )
      .then(async (response) => {
        if (response.ok) {
          let data = await response.json();
          setProjectDetails({
            ...projectDetails,
            cost_per_month: data.cost_per_month,
            payoff_time: data.payoff_time,
          });
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      })
      .catch((error) => {
        setSuccess(false);
      });
  };

  const handleBeginFunding = async () => {
    fetch(`${BASE_URL}/project/${projectId}`, {
      method: "PATCH",
      body: JSON.stringify({
        status: "Funding",
        amortisation: amortisation.current,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(async (response) => {
        console.log(response);
        if (response.ok) {
          // let data = await response.json();
          setProjectDetails({ ...projectDetails, status: "Funding" });
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      })
      .catch((error) => {
        setSuccess(false);
      });
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          {projectDetails?.status === "WaitingForApproval" ? (
            <InReview handleRefresh={handleRefresh} />
          ) : projectDetails?.status === "Approved" ? (
            <FundingConfiguration
              projectDetails={projectDetails}
              onAmortizationChange={(e) => (amortisation.current = e)}
              handleCalculate={handleCalculate}
              handleBeginFunding={handleBeginFunding}
            />
          ) : projectDetails?.status === "Funding" ? (
            <Funding
              projectDetails={projectDetails}
              projectDetailsMaps={projectDetailsMaps}
            ></Funding>
          ) : (
            <Typography variant="h4">
              Sorry, your project has been rejected.
            </Typography>
          )}
        </Grid>
      </Grid>
      <div style={{ position: "absolute", top: 100, left: 0, right: 0 }}>
        <Container maxWidth="lg">
          <CollapseAlert
            error={{
              open: !success,
              severity: "error",
              message: "Something went wrong. Please try again later.",
            }}
            onClose={() => setSuccess(!success)}
          />
        </Container>
      </div>
    </>
  );
}
