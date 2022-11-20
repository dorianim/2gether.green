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
     const [costProfit, setCostProfit] = React.useState<CostProfit>({profit: (100 / props.projectDetails.cost_per_month!)* props.projectDetails.revenue_per_month!, cost: 100});
    

    const list =  Object.keys(props.projectDetailsMaps).map((key) => {
        return (<li>{props.projectDetailsMaps[key]}: {props.projectDetails[key as keyof ProjectDetails]}</li>);
    });


    function handleInvestmentChange(amount: number) {
        if(props.projectDetails.cost_per_month && props.projectDetails.revenue_per_month) {
            let rate = amount / props.projectDetails.cost_per_month;
            setCostProfit({profit: rate * props.projectDetails.revenue_per_month!, cost: amount});
        } else {
            setCostProfit({profit: 0, cost: amount});
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
        <div>
            <h1>Funding</h1>
            <ul>
                {list}
            </ul>
            <Project project={{project_type: props.projectDetails.project_type, progress: parseInt(progress), participants: parseInt(partecipants), total_cost: props.projectDetails.total_cost!, handleInvestmentChange }} />
            <CostChart payOffMonth={props.projectDetails.payoff_time!} cost_per_month={costProfit?.cost} profit_per_month={costProfit?.profit} construction_time={props.projectDetails.construction_time!} ></CostChart>
        </div>
    )

}
