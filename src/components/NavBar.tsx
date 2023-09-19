import { AppBar, Box, IconButton, Typography } from "@mui/material";
import { UserMenu } from "./UserMenu";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { STATIC_TEXT } from "../consts/staticText";

// This is Navigation Bar component, which is present on top most of the screen,
// its convinient to go to home page and switch user profiles from here 
const NavBar: FC = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Box display="flex" justifyContent="space-between" alignContent="center">
        <Box display="flex" alignItems="center">
          <IconButton onClick={() => navigate("/")}>
            <HomeIcon fontSize="large" sx={{ color: 'white' }} />
          </IconButton>
          <Typography variant="h5">{STATIC_TEXT.appTitle}</Typography>
        </Box>
        <UserMenu />
      </Box>
    </AppBar>
  );
};

export default NavBar;
