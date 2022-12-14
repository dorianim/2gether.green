import React, { useEffect, useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import CollapsableAlert from "./CollapsableAlert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import OwnDialog from "./OwnDialog";
import { Clear, Done } from "@mui/icons-material";
import { BASE_URL } from "./Api";

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

  const [current_project_id, set_current_project_id] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [total_cost, set_total_cost] = React.useState(0);
  const [construction_time, set_construction_time] = React.useState(0);
  const [revenue_per_month, set_revenue_per_month] = React.useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = async (
    total_cost: number,
    revenue_per_month: number,
    construction_time: number
  ) => {
    setOpen(false);
    set_total_cost(total_cost);
    set_construction_time(construction_time);
    set_revenue_per_month(revenue_per_month);
    const requestOptions = {
      method: "PATCH",
      body: JSON.stringify({
        status: "Approved",
        id: current_project_id,
        total_cost: total_cost,
        construction_time: construction_time,
        revenue_per_month,
      }),
    };
    await fetch(`${BASE_URL}/project/${current_project_id}`, requestOptions)
      .then((res) => {
        if (res.status >= 400 && res.status < 600) {
          setSuccess(false);
          throw new Error("Bad response from server");
        }
      })
      .catch((err) => {
        setSuccess(false);
        console.log(err);
      });
    getOpenRequests();
  };

  const getOpenRequests = async () => {
    await fetch(`${BASE_URL}/project/`)
      .then((res) => {
        if (res.status >= 400 && res.status < 600) {
          setSuccess(false);
          throw new Error("Bad response from server");
        }
        return res.json();
      })
      .then((requests) => {
        setRequests(requests);
        getOpenRequests;
      })
      .catch((err) => {
        setSuccess(false);
        console.log(err);
      });
  };

  const handleApprove = async (project_id: number) => {
    set_current_project_id(project_id);
    handleClickOpen();
  };
  const handleCancel = async (request_id: number) => {
    const requestOptions = {
      method: "PATCH",
      body: JSON.stringify({
        status: "Rejected",
      }),
    };
    await fetch(`${BASE_URL}/project/${request_id}`, requestOptions)
      .then((res) => {
        if (res.status >= 400 && res.status < 600) {
          setSuccess(false);
          throw new Error("Bad response from server");
        }
      })
      .catch((err) => {
        setSuccess(false);
        console.log(err);
      });
    getOpenRequests();
  };

  return (
    <Grid container sx={{ paddingTop: 2 }}>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h5" gutterBottom component="div">
          Projects pending approval
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <CollapsableAlert
          error={{
            open: !success,
            severity: "error",
            message: "Something went wrong. Please try again later.",
          }}
          onClose={() => setSuccess(!success)}
        />
      </Grid>

      <Grid item xs={12}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">zip code</TableCell>
              <TableCell align="right">project type</TableCell>
              <TableCell align="right">status</TableCell>
              <TableCell align="right">approve</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests
              .filter(
                (request: Request) => request.status === "WaitingForApproval"
              )
              .map((request: Request) => (
                <TableRow
                  key={request.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{request.zip_code}</TableCell>
                  <TableCell align="right"> {request.project_type}</TableCell>
                  <TableCell align="right">{request.status}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="success"
                      onClick={() => handleApprove(request.id)}
                    >
                      <Done />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleCancel(request.id)}
                    >
                      <Clear />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Grid>

      <OwnDialog
        total_cost={total_cost}
        construction_time={construction_time}
        revenue_per_month={revenue_per_month}
        open={open}
        onClose={handleClose}
      />

      <div></div>
    </Grid>
  );
}
