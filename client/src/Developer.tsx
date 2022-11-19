import React, { useEffect, useState } from "react";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import ReportIcon from "@mui/icons-material/Report";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import { Grid } from "@mui/joy";
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

      {success === false && (
        <Alert
          key={"Error"}
          sx={{ alignItems: "flex-start" }}
          startDecorator={React.cloneElement(<ReportIcon />, {
            sx: { mt: "2px", mx: "4px" },
            fontSize: "xl2",
          })}
          variant="soft"
          color={"danger"}
          endDecorator={
            <IconButton
              variant="soft"
              size="sm"
              color={"danger"}
              onClick={() => {
                setSuccess(true);
              }}
            >
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
        </Alert>
      )}
    </div>
  );
}
