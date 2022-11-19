import { Close } from "@mui/icons-material";
import {
  Alert,
  AlertColor,
  Collapse,
  IconButton,
  SxProps,
  Theme,
} from "@mui/material";
import { useContext } from "react";

interface ErrorData {
  open: boolean;
  severity: AlertColor;
  message: string;
}

export default function CollapsableAlert(props: {
  sx?: SxProps<Theme>;
  error: ErrorData;
  onClose: () => void;
}) {
  const { sx, error, onClose } = props;

  return (
    <Collapse in={error.open}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <Close fontSize="inherit" />
          </IconButton>
        }
        severity={error.severity}
        variant="filled"
        sx={sx}
      >
        {error.message}
      </Alert>
    </Collapse>
  );
}
