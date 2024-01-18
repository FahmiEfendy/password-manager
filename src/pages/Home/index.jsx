import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import classes from "./style.module.scss";
import { callApi } from "../../domain/api";
import DeleteModal from "../../components/DeleteModal";

const Home = () => {
  const navigate = useNavigate();

  const [deleteId, setDeleteId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [accountList, setAccountList] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const detailAccountHandler = (id) => {
    navigate(`/detail/${id}`);
  };

  const deleteAccountHandler = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
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
      {!isLoading ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h5">Website</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5">Email</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5">Category</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h5">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accountList.map((data) => {
                return (
                  <TableRow key={data.id}>
                    <TableCell>
                      <Typography variant="body1">{data.provider}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{data.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{data.category}</Typography>
                    </TableCell>
                    <TableCell className={classes.btn_container}>
                      <Button
                        variant="contained"
                        onClick={() => detailAccountHandler(data.id)}
                      >
                        Detail
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        className={classes.btn_delete}
                        onClick={() => deleteAccountHandler(data.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <CircularProgress />
      )}
      <DeleteModal
        id={deleteId}
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
      />
    </Container>
  );
};

export default Home;
