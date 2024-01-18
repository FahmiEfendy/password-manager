import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import classes from "./style.module.scss";
import { callApi } from "../../domain/api";
import AddModal from "../../components/AddModal";
import DeleteModal from "../../components/DeleteModal";
import PasswordList from "../../components/PasswordList";

const Category = () => {
  const { category } = useParams();

  const [deleteId, setDeleteId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [passwordListByCategory, setPasswordListByCategory] = useState([]);

  const addPasswordHandler = () => {
    setIsAddModalOpen(true);
  };

  useEffect(() => {
    const getAccountListByCategory = async () => {
      setIsLoading(true);
      try {
        const response = await callApi(
          `/password/?category=${category}`,
          "GET"
        );

        setPasswordListByCategory(response);
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    };

    getAccountListByCategory();
  }, [category]);

  return (
    <React.Fragment>
      {!isLoading ? (
        <Container>
          {category !== "work" &&
          category !== "personal" &&
          category !== "family" ? (
            <Typography variant="h5" className={classes.not_found}>
              No password found for categories {category}
            </Typography>
          ) : passwordListByCategory.length > 0 ? (
            <React.Fragment>
              <Box className={classes.container__btn_add}>
                <Typography variant="h5" className={classes.header}>
                  {category} Password
                </Typography>
                <Button
                  variant="contained"
                  className={classes.btn_add}
                  onClick={addPasswordHandler}
                >
                  Add Password
                </Button>
              </Box>
              <PasswordList
                datas={passwordListByCategory}
                setDeleteId={setDeleteId}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
              />
            </React.Fragment>
          ) : (
            <Box className={classes.container_not_found}>
              <Typography variant="h5" className={classes.not_found}>
                You dont have saved password for categories {category}
              </Typography>
              <Button
                variant="contained"
                className={classes.btn_add_second}
                onClick={addPasswordHandler}
              >
                Add Password
              </Button>
            </Box>
          )}
        </Container>
      ) : (
        <CircularProgress />
      )}

      <DeleteModal
        id={deleteId}
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
      />

      <AddModal isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen} />
    </React.Fragment>
  );
};

export default Category;
