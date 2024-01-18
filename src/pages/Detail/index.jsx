import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { callApi } from "../../domain/api";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import classes from "./style.module.scss";

const Detail = () => {
  const { id } = useParams();

  const [userDetail, setUserDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const deleteAccountHandler = (id) => {
    // TODO: Show Popup to Delete Confirmation
    console.log(id);
  };

  useEffect(() => {
    const getUserDetail = async () => {
      setIsLoading(true);
      try {
        const response = await callApi(`/password/${id}`, "GET");
        setUserDetail(response);
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    };

    getUserDetail();
  }, [id]);

  return (
    <React.Fragment>
      {!isLoading ? (
        <Container maxWidth="lg" className={classes.container}>
          {/* TODO: Get Profile Picture */}
          <Box className={classes.container_left}>Profile Picture</Box>
          <Grid container rowSpacing={5} className={classes.container_right}>
            <Grid item xs={6}>
              <Typography variant="h5">Provider</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">{userDetail.provider}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Email</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">{userDetail.email}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Category</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">{userDetail.category}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="error"
                className={classes.btn_delete}
                onClick={() => deleteAccountHandler(data.id)}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <CircularProgress />
      )}
    </React.Fragment>
  );
};

export default Detail;
