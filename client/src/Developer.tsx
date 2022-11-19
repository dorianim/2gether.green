import React, { useEffect, useState } from "react";
import ReportIcon from "@mui/icons-material/Report";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Alert, Grid, List, ListItem, Typography } from "@mui/material";
import CollapsableAlert from "./CollapsableAlert";
export default function Developer() {
  interface Request {
    id: number;
    status: string;
    zip_code: number;
    project_type: string;
  }
  const [requests, setRequests] = useState([]);
  const [success, setSuccess] = useState(true);
  useEffect(() => {
    getOpenRequests();
  }, []);

  const getOpenRequests = async () => {
    await fetch("http://localhost:8000/api/v1/project/")
      .then((res) => {
        if (res.status >= 400 && res.status < 600) {
          setSuccess(false);
          throw new Error("Bad response from server");
        }
        return res.json();
      })
      .then((requests) => {
        setRequests(requests);
      })
      .catch((err) => {
        setSuccess(false);
        console.log(err);
      });
  };

  return (
    <div>
      <h1>All open requests:</h1>
      <List aria-label="basic-list">
        {requests
          .filter((request: Request) => request.status === "WaitingForApproval")
          .map((request: Request) => (
            <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  {request.zip_code}
                </Grid>
              </Grid>
              , {request.project_type}, {request.status}
            </ListItem>
          ))}
      </List>

      <CollapsableAlert
        error={{
          open: success,
          severity: "error",
          message: "Something went wrong. Please try again later.",
        }}
        onClose={() => setSuccess(true)}
      />
    </div>
  );
}
