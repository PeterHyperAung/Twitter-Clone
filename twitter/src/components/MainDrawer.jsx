import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  Person as PersonIcon,
  Logout as LogoutIcon
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import { Typography } from "@mui/material";

export default function MainDrawer({ drawerState, toggleDrawer }) {
  const navigate = useNavigate();
  const { auth, authUser, setAuth, setAuthUser } = useAuth();

  const list = () => (
    <Box
      sx={{ width: 250 }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ width: '100%', height: 170, backgroundColor: "#757575" }}>
      <Typography>
        {authUser.name}@{authUser.handle}
      </Typography>
      </Box>

      {auth ? (<List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate('/account')
            }}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              localStorage.removeItem('token')
              setAuth(false)
              setAuthUser({});
              navigate('/')
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>) : (
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/login");
              }}
            >
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/register");
              }}
            >
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer anchor="left" open={drawerState} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
