import React from "react";
import { Toolbar, AppBar, Typography } from "@mui/material";

const Header = () => {
  return (
    <div style={{margin:"100px"}}>
      <AppBar>
        <Toolbar>
          <Typography variant="h4">To Do List</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
