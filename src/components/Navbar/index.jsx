import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";

import classes from "./style.module.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const navList = ["family", "personal", "work"];

  const goHomepageHandler = () => {
    navigate("/");
  };

  const navHandler = (category) => {
    console.log(category);
    navigate(`/category/${category}`);
    console.log("trigered");
  };

  return (
    <React.Fragment>
      <Box className={classes.container}>
        <AppBar position="static">
          <Toolbar>
            <Box onClick={goHomepageHandler} className={classes.container_logo}>
              <EnhancedEncryptionIcon className={classes.logo} />
              <Typography variant="body1" className={classes.logo_text}>
                Password Manager
              </Typography>
            </Box>
            <Box className={classes.navbar}>
              {navList.map((data) => {
                return (
                  <Box
                    onClick={() => navHandler(data)}
                    className={classes.navbar_list}
                  >
                    <Typography
                      variant="body1"
                      className={classes.navbar_list_item}
                    >
                      {data}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </React.Fragment>
  );
};

export default Navbar;
