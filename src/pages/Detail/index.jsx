import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import classes from "./style.module.scss";
import { callApi } from "../../domain/api";
import DeleteModal from "../../components/DeleteModal";

const Detail = () => {
  const { id } = useParams();

  const [deleteId, setDeleteId] = useState(null);
  const [userDetail, setUserDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const deleteAccountHandler = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
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
        <Container maxWidth="xs" className={classes.container}>
          {/* TODO: Get Profile Picture */}
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
            <Grid item xs={1} className={classes.container_btn}>
              <Button
                variant="contained"
                color="error"
                className={classes.btn_delete}
                onClick={() => deleteAccountHandler(id)}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <CircularProgress />
      )}
      <DeleteModal
        id={deleteId}
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
      />
    </React.Fragment>
  );
};

export default Detail;
