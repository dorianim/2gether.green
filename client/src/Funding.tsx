import { Grid, Paper, Table, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import React from "react";
import { CostChart } from "./Chart";
import Project from "./Project";
import { ProjectDetails } from "./WaitForResponse";


interface FundingProps {
    projectDetails: ProjectDetails;
    projectDetailsMaps: any;
}

interface CostProfit {
    cost: number;
    profit: number;
}

export default function Funding(props: FundingProps) {
    const [costProfit, setCostProfit] = React.useState<CostProfit>({ profit: (100 / props.projectDetails.cost_per_month!) * props.projectDetails.revenue_per_month!, cost: 100 });


    const list = Object.keys(props.projectDetailsMaps).map((key) => {
        return (
            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                    {props.projectDetailsMaps[key]}
                </TableCell> 
                <TableCell align="right"> 
                    {props.projectDetails[key as keyof ProjectDetails]}
                </TableCell>
            </TableRow>
            );
    });


    function handleInvestmentChange(amount: number) {
        if (props.projectDetails.cost_per_month && props.projectDetails.revenue_per_month) {
            let rate = amount / props.projectDetails.cost_per_month;
            setCostProfit({ profit: rate * props.projectDetails.revenue_per_month!, cost: amount });
        } else {
            setCostProfit({ profit: 0, cost: amount });
        }
    }


    let partecipants = localStorage.getItem("partecipants");
    if (partecipants == null) {
        partecipants = Math.random() * 200 + "";
        localStorage.setItem("partecipants", partecipants);
    }
    let progress = localStorage.getItem("progress");
    if (progress == null) {
        progress = Math.random() * 100 + "";
        localStorage.setItem("progress", progress);
    }

    console.log(list);

    return (
        <Grid
            container
            sx={{
                paddingTop: 2,
                justifyContent: "center",
                width: "80%",
                alignSelf: "center",
                margin: "auto",
                textAlign: "center",
            }}
            spacing={2}
        >
            <h1></h1>
            <Grid item xs={12} sx={{ alignItems: "center", marginTop: "-10rem" }}>
                <img
                    src="/images/photo6.jpg"
                    style={{ width: "100%", borderRadius: "4rem" }}
                />
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h4">Funding the project!</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1">
                    Now that you've choosen an amortisations rate, you can start funding the project!
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table >
                        {list}
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12}>
                <Project project={{ project_type: props.projectDetails.project_type, progress: parseInt(progress), participants: parseInt(partecipants), total_cost: props.projectDetails.total_cost!, handleInvestmentChange }} />
            </Grid>
            <CostChart payOffMonth={props.projectDetails.payoff_time!} cost_per_month={costProfit?.cost} profit_per_month={costProfit?.profit} construction_time={props.projectDetails.construction_time!} ></CostChart>
        </Grid>
    )

}
