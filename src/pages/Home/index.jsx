import { useEffect, useState } from "react";
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
import AlertModal from "../../components/AlertModal";
import DeleteModal from "../../components/DeleteModal";
import PasswordList from "../../components/PasswordList";

const Home = () => {
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [accountList, setAccountList] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const addPasswordHandler = () => {
    setIsAddModalOpen(true);
  };

  useEffect(() => {
    const getAccountList = async () => {
      setIsLoading(true);
      try {
        const response = await callApi("/password", "GET");
        setAccountList(response);
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

    getAccountList();
  }, []);

  return (
    <Container>
      <Box className={classes.container__btn_add}>
        <Typography variant="h5">Password List</Typography>
        <Button
          variant="contained"
          className={classes.btn_add}
          onClick={addPasswordHandler}
        >
          Add Password
        </Button>
      </Box>
      {!isLoading ? (
        <PasswordList
          datas={accountList}
          setDeleteId={setDeleteId}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      ) : (
        <CircularProgress />
      )}
      <DeleteModal
        id={deleteId}
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
      />

      <AddModal isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen} />

      {isSuccess && <AlertModal message="Success Get All Password!" />}

      {error !== "" && (
        <AlertModal
          error
          message={`Failed to Get All Password Because of ${error}`}
        />
      )}
    </Container>
  );
};

export default Home;
