import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Fade,
  FormLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import classes from "./style.module.scss";
import { callApi } from "../../domain/api";

const AddModal = ({ isOpen, setIsOpen }) => {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const categoryChangeHandler = (e) => {
    setCategory(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const websiteChangeHandler = (e) => [setWebsite(e.target.value)];

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password.length < 6) return setIsPasswordValid(false);
    setIsPasswordValid(true);

    const data = {
      id: uuidv4(),
      email,
      provider: website,
      password,
      category,
    };

    try {
      await callApi("/password", "POST", {}, {}, data);
      location.reload();
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
          <Typography variant="h5">New Password</Typography>
          <form onSubmit={submitHandler}>
            <FormLabel className={classes.form_label}>Website Name</FormLabel>
            <TextField
              required
              type="text"
              placeholder="Website Name"
              variant="outlined"
              onChange={(e) => {
                websiteChangeHandler(e);
              }}
            />
            <FormLabel className={classes.form_label}>Email</FormLabel>
            <TextField
              type="email"
              required
              placeholder="Email"
              variant="outlined"
              onChange={(e) => {
                emailChangeHandler(e);
              }}
            />
            <FormLabel className={classes.form_label}>Password</FormLabel>
            <TextField
              required
              type="password"
              error={!isPasswordValid}
              placeholder="Password"
              variant="outlined"
              helperText={!isPasswordValid && "Minimal Length is 6 Character!"}
              onChange={(e) => {
                passwordChangeHandler(e);
              }}
            />
            <FormLabel className={classes.form_label}>Category</FormLabel>
            <Select
              required
              value={category}
              onChange={(e) => {
                categoryChangeHandler(e);
              }}
            >
              {/* TODO: Add Placeholder */}
              <MenuItem value="" disabled>
                Category
              </MenuItem>
              <MenuItem value="Work">Work</MenuItem>
              <MenuItem value="Family">Family</MenuItem>
              <MenuItem value="Personal">Personal</MenuItem>
            </Select>
            <Box className={classes.container_btn}>
              <Button variant="outlined" onClick={closeModalHandler}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Add
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddModal;
