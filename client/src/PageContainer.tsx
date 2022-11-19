import { Container } from "@mui/material";
import "./PageContainer.css";

export default function PageContainer(props: React.PropsWithChildren<{}>) {
  return <Container>{props.children}</Container>;
}
