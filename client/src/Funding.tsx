import { Card, CardContent, Typography } from "@mui/material";
import Project from "./Project";
import { ProjectDetails } from "./WaitForResponse";


interface FundingProps {
    projectDetails: ProjectDetails;
    projectDetailsMaps: any;
}

export default function Funding(props: FundingProps) {

    const list =  Object.keys(props.projectDetailsMaps).map((key) => {
        return (<li>{props.projectDetailsMaps[key]}: {props.projectDetails[key as keyof ProjectDetails]}</li>);
    });

    console.log(list);

    return (
        <div>
            <h1>Funding</h1>
            <ul>
                {list}
            </ul>
            <Project project={{name: "Hallo", progress: 3, participants: 65}} />
        </div>
    )

}
