import { Alert, Stack } from "@mui/material";

import classes from "./style.module.scss";

const AlertModal = ({ message = "", error = false }) => {
  return (
    <Stack className={classes.container} spacing={2}>
      <Alert variant="filled" severity={error ? "error" : "success"}>
        {message}
      </Alert>
    </Stack>
  );
};

export default AlertModal;
