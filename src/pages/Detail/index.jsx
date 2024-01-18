import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import classes from "./style.module.scss";
import { callApi } from "../../domain/api";
import AlertModal from "../../components/AlertModal";
import DeleteModal from "../../components/DeleteModal";

const Detail = () => {
  const { id } = useParams();

  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [userDetail, setUserDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      } catch (err) {
        setError(err.message);
        console.log(err.message);

        setTimeout(() => {
          setError("");
        }, 3000);
      }
      setIsLoading(false);
    };

    getUserDetail();
  }, [id]);

  return (
    <React.Fragment>
      {!isLoading ? (
        userDetail.length === undefined ? (
          <Container maxWidth="sm" className={classes.container}>
            <Grid container rowSpacing={5} className={classes.container_right}>
              <Grid item xs={4} className={classes.col}>
                <Typography variant="h5">Provider</Typography>
              </Grid>
              <Grid item xs={8} className={classes.col}>
                <Typography variant="h5">{userDetail.provider}</Typography>
              </Grid>
              <Grid item xs={4} className={classes.col}>
                <Typography variant="h5">Email</Typography>
              </Grid>
              <Grid item xs={8} className={classes.col}>
                <Typography variant="h5">{userDetail.email}</Typography>
              </Grid>
              <Grid item xs={4} className={classes.col}>
                <Typography variant="h5">Category</Typography>
              </Grid>
              <Grid item xs={8} className={classes.col}>
                <Typography variant="h5">{userDetail.category}</Typography>
              </Grid>
              <Grid item xs={12} className={classes.container_btn}>
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
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            No password found with id of {id}
          </Typography>
        )
      ) : (
        <CircularProgress />
      )}
      <DeleteModal
        id={deleteId}
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
      />

      {isSuccess && <AlertModal message="Success Get User Detail!" />}

      {error !== "" && (
        <AlertModal
          error
          message={`Failed to Get All Password Because of ${error}`}
        />
      )}
    </React.Fragment>
  );
};

export default Detail;
