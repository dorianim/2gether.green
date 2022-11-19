import React, { useEffect, useState } from "react";
import Alert from "@mui/joy/Alert";
import IconButton from '@mui/joy/IconButton';
import ReportIcon from '@mui/icons-material/Report';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Typography from '@mui/joy/Typography';
export default function Developer(){
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
          .then((requests) => { setRequests(requests)}).
          catch((err) => {
            setSuccess(false);
            console.log(err);
          });
   
    }

    return (<div><h1>All open requests:</h1>
        {requests}
        {success === false && <Alert
        key={"Error"}
        sx={{ alignItems: 'flex-start' }}
        startDecorator={React.cloneElement(<ReportIcon />, {
          sx: { mt: '2px', mx: '4px' },
          fontSize: 'xl2',
        })}
        variant="soft"
        color={'danger'}
        endDecorator={
          <IconButton variant="soft" size="sm" color={'danger'} onClick={() => {setSuccess(true);}}>
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
      </Alert>}</div>
    );

}