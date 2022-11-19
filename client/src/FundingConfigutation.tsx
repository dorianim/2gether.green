import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ProjectDetails } from "./WaitForResponse";

export default function FundingConfiguration(props: {
  projectDetails: ProjectDetails;
  onAmortizationChange: (amortization: number) => void;
  handleCalculate: () => void;
  handleBeginFunding: () => void;
}) {
  const {
    projectDetails,
    onAmortizationChange,
    handleBeginFunding,
    handleCalculate,
  } = props;

  const [alreadyCalculated, setAlreadyCalculated] = useState(false);

  const data = [
    ["Construction time", projectDetails.construction_time],
    ["Cost per month", projectDetails.cost_per_month],
    ["Payoff time", projectDetails.payoff_time],
    ["Revenue per month", projectDetails.revenue_per_month],
    ["Total cost", projectDetails.total_cost],
  ];

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
      <Grid item xs={12} sx={{ alignItems: "center", marginTop: "-10rem" }}>
        <img
          src="/images/photo5.jpg"
          style={{ width: "100%", borderRadius: "4rem" }}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h4">Your project has been approved!</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          The only thing left to do now is to choose the amortization rate. Our
          sponsor Interhyp then searches for matching mortgages and you can
          start funding your project!
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row[0]}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row[0]}
                  </TableCell>
                  <TableCell align="right">
                    {row[1] || <i>calculate first</i>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item xs={12}>
        <TextField
          className="login-field"
          label="Amortisation Rate"
          variant="outlined"
          onChange={(e) => onAmortizationChange(parseInt(e.target.value))}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={() => {
            handleCalculate();
            setAlreadyCalculated(true);
          }}
          fullWidth
        >
          Calculate
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={handleBeginFunding}
          disabled={!alreadyCalculated}
          fullWidth
        >
          Begin funding
        </Button>
      </Grid>
    </Grid>
  );
}
