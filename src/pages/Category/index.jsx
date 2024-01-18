import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import classes from "./style.module.scss";
import { callApi } from "../../domain/api";
import { CircularProgress, Container, Typography } from "@mui/material";
import PasswordList from "../../components/PasswordList";

const Category = () => {
  const { category } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordListByCategory, setPasswordListByCategory] = useState([]);

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
            <Typography variant="h5">
              No password found for categories {category}
            </Typography>
          ) : passwordListByCategory.length > 0 ? (
            <PasswordList datas={passwordListByCategory} />
          ) : (
            <Typography variant="h5">
              You dont have saved password for categories {category}
            </Typography>
          )}
        </Container>
      ) : (
        <CircularProgress />
      )}
    </React.Fragment>
  );
};

export default Category;
