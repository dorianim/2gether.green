import React from "react";
import Button from "@mui/joy/Button";
export default function WaitForResponse () {
    const handleRefresh = () => {
        //TODO
    }
    return (

        <div><h2>Success! We will check your request. </h2>
        <h3>This will may take a while. 
        Please return to this page in a few days.
        </h3><div className="submitButton">
        <Button variant="solid" onClick={handleRefresh}>
          Refresh
        </Button>
      </div></div>
    )
}