import * as React from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";

export interface OwnDialogProps {
  open: boolean;
  total_cost: number;
  revenue_per_month: number;
  construction_time: number;
  onClose: (
    total_cost: number,
    revenue_per_month: number,
    construction_time: number
  ) => void;
}

export default function OwnDialog(props: OwnDialogProps) {
  const [total_cost, set_total_cost] = React.useState(props.total_cost);
  const [construction_time, set_construction_time] = React.useState(
    props.construction_time
  );
  const [revenue_per_month, set_revenue_per_month] = React.useState(
    props.revenue_per_month
  );
  const onClose = props.onClose;
  const open = props.open;

  const handleClose = () => {
    onClose(total_cost, revenue_per_month, construction_time);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Enter details</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <TextField
            type="number"
            label="Total Costs (€):"
            InputProps={{ inputProps: { min: 30001, max: 100000000 } }}
            placeholder="0"
            onChange={(e) => set_total_cost(parseInt(e.target.value))}
            fullWidth
            required
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Construction Time (months):"
            placeholder="0"
            type="number"
            onChange={(e) => set_construction_time(parseInt(e.target.value))}
            fullWidth
            required
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Revenue per month (€):"
            placeholder="0"
            type="number"
            onChange={(e) => set_revenue_per_month(parseInt(e.target.value))}
            fullWidth
            required
          />
        </ListItem>
        <ListItem>
          <Button onClick={handleClose}>Submit</Button>
        </ListItem>
      </List>
    </Dialog>
  );
}
