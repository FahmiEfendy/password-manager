import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Container } from "@mui/material";

import classes from "./style.module.scss";
import { callApi } from "../../domain/api";
import AddModal from "../../components/AddModal";
import DeleteModal from "../../components/DeleteModal";
import PasswordList from "../../components/PasswordList";

const Home = () => {
  const [deleteId, setDeleteId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    };

    getAccountList();
  }, []);

  return (
    <Container>
      <Box className={classes.container__btn_add}>
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
    </Container>
  );
};

export default Home;
