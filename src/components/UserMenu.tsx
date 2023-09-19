import { useContext, useRef, useState } from "react";
import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material";
import {
  ArrowDropDown as ArrowDropDownIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { UserContext } from "../contexts/userContext";
import type { IUser } from "../types";
import { users } from "../consts/users";

// Component to show user menu on top right corner
export const UserMenu = () => {
  const userBoxRef = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { userRole, setUserRole } = useContext(UserContext);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleMenuItemClick = (user: IUser) => {
    handleClose();
    setUserRole(user.role);
  };

  return (
    <Box display="flex" alignItems="center">
      <PersonIcon />
      <IconButton size="large" ref={userBoxRef} onClick={handleOpen}>
        <ArrowDropDownIcon />
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={userBoxRef.current}
        elevation={2}
        onClose={handleClose}
      >
        {users.map((user) => (
          <MenuItem
            key={user.id}
            onClick={() => handleMenuItemClick(user)}
            selected={user.role === userRole}
          >
            <Avatar sx={{ mr: 1 }} />
            {user.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};