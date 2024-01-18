import React, { useState } from "react";
import { Box, Button, Fade, Modal, Typography } from "@mui/material";

import AlertModal from "../AlertModal";
import classes from "./style.module.scss";
import { callApi } from "../../domain/api";

const DeleteModal = ({ isOpen, setIsOpen, id }) => {
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  const confirmDeleteHandler = async () => {
    try {
      await callApi(`/password/${id}`, "DELETE");
      setIsSuccess(true);
      setIsOpen(false);

      setTimeout(() => {
        setIsSuccess(false);
        location.reload();
      }, 3000);
    } catch (err) {
      setError(err.message);
      console.log(err.message);

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <React.Fragment>
      <Modal
        open={isOpen}
        onClose={closeModalHandler}
        className={classes.container}
      >
        <Fade in={isOpen}>
          <Box className={classes.container__inner}>
            <Typography variant="h5">
              Are you sure want to delete this password?
            </Typography>
            <Box className={classes.container_btn}>
              <Button
                variant="outlined"
                onClick={closeModalHandler}
                className={classes.btn_cancel}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={confirmDeleteHandler}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {isSuccess && (
        <AlertModal
          message={`Success Delete a Password for Website with id of ${id}`}
        />
      )}

      {error !== "" && (
        <AlertModal
          error
          message={`Failed to Delete a Password Because of ${error}`}
        />
      )}
    </React.Fragment>
  );
};

export default DeleteModal;
