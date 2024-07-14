import { Alert, Snackbar } from "@mui/material";

interface AlertSnackbarProps {
  isOpen: boolean;
  message: string;
  handleClose: (isClose: boolean) => void;
}

// TODO: Unit test

export default function AlertSnackbar({
  isOpen,
  message,
  handleClose,
}: AlertSnackbarProps) {
  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      onClose={() => handleClose(false)}
    >
      <Alert
        onClose={() => handleClose(false)}
        severity="error"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
