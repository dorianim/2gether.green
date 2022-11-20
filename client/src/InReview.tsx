import { Button, Grid, Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Link } from "react-router-dom";

export default function InReview(props: { handleRefresh: () => void }) {
  const handleRefresh = props.handleRefresh;
  return (
    <Grid
      container
      sx={{
        paddingTop: 2,
        justifyContent: "center",
        width: "50%",
        alignSelf: "center",
        margin: "auto",
        textAlign: "center",
      }}
      spacing={2}
    >
      <Grid item xs={12} sx={{ alignItems: "center", marginTop: "-8rem" }}>
        <img
          src="/images/photo3.webp"
          style={{ width: "100%", borderRadius: "4rem" }}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h4">Welcome on board!</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          Our team of experts will do everything to make this project a success
          as fast as possible. This is what will happen now:
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              Check of the location and profitability
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Get in touch with local suppliers</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              Get a reliable quote and timespan for you
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent>You give the final go!</TimelineContent>
          </TimelineItem>
        </Timeline>
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" onClick={handleRefresh}>
          Refresh
        </Button>
      </Grid>
      <div style={{ position: "absolute", bottom: "0", marginBottom: "16px", color: "#8b949e" }}>
       <Typography variant="body1">Note: For demo purposes you can accept your own Project <Link to="/developer">here</Link></Typography>
      </div>
    </Grid>
  );
}
