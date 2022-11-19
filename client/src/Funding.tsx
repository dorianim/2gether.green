import { Card, CardContent, Typography } from "@mui/material";
import { ProjectDetails, projectDetailsMaps } from "./WaitForResponse";


interface FundingProps {
    projectDetails: ProjectDetails;
}

export default function Funding(props: FundingProps) {


    return (
        <div>
            {Object.keys(props.projectDetails).map((key) => {
                return (
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {projectDetailsMaps.get(key)}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }}>
                                {props.projectDetails[key as keyof ProjectDetails]}
                            </Typography>
                        </CardContent>
                        <div>{key}: {props.projectDetails[key as keyof ProjectDetails]}</div>
                    </Card>
                );
            })}
        </div>
    )

}
