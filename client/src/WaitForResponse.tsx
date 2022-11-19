import { Button } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
export default function WaitForResponse() {
  const { projectId } = useParams();

  const handleRefresh = async () => {
    //TODO
  };
  return (
    <div>
      <h2>Success! We will check your request. </h2>
      <h3>
        This will may take a while. Please return to this page in a few days.
      </h3>
      <div className="submitButton">
        <Button variant="contained" onClick={handleRefresh}>
          Refresh
        </Button>
      </div>
    </div>
  );
}
