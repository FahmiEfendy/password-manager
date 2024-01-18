import { useNavigate } from "react-router-dom";
import { Box, Button, Fade, Modal, Typography } from "@mui/material";

import classes from "./style.module.scss";
import { callApi } from "../../domain/api";

const DeleteModal = ({ isOpen, setIsOpen, id }) => {
  const navigate = useNavigate();

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  const confirmDeleteHandler = async () => {
    try {
      const response = await callApi(`/password/${id}`, "DELETE");
      setIsOpen(false);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
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
  );
};

export default DeleteModal;
