import { useNavigate } from "react-router-dom";
import {
  Button,
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

const PasswordList = ({ datas, setDeleteId, setIsDeleteModalOpen }) => {
  const navigate = useNavigate();

  const detailAccountHandler = (id) => {
    navigate(`/detail/${id}`);
  };

  const deleteAccountHandler = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  return (
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
          {datas.map((data) => {
            return (
              <TableRow key={data.id}>
                <TableCell>
                  <Typography variant="body1">{data.provider}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{data.email}</Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    className={classes.capitalize_text}
                  >
                    {data.category}
                  </Typography>
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
  );
};

export default PasswordList;
