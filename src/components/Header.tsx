import React, { Fragment } from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import HolidayVillageOutlinedIcon from "@mui/icons-material/HolidayVillageOutlined";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../auth/auth";

export default function Header() {
  const auth = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    auth.signout().then(() => {
      history.push("/");
    });
  };

  return (
    <AppBar position="static">
      <div className="content-wrapper">
        <Toolbar
          sx={{
            "&.MuiToolbar-root": {
              padding: 0,
            },
            "& .MuiSvgIcon-root": {
              transform: "scale(1.4)",
            },
          }}
        >
          <HolidayVillageOutlinedIcon fontSize="large" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            Wakaroo Booking
          </Typography>
          {!auth.user && (
            <Fragment>
              <Button component={Link} to={"/registration"} color="inherit">
                Register
              </Button>
              <Button component={Link} to={"/login"} color="inherit">
                Login
              </Button>
            </Fragment>
          )}
          {auth.user && (
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          )}
        </Toolbar>
      </div>
    </AppBar>
  );
}
