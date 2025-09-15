import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { IoMenu } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { MyContext } from "../../App";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 12,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  width: "100%",
  maxWidth: 400,
  margin: "0 auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.grey[600],
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  width: "100%",
}));

const Header = () => {
  const [accountAnchor, setAccountAnchor] = useState(null);
  const [notifyAnchor, setNotifyAnchor] = useState(null);
  const [cartAnchor, setCartAnchor] = useState(null);
  const [mailAnchor, setMailAnchor] = useState(null);
  const [themeAnchor, setThemeAnchor] = useState(null);
  const context = useContext(MyContext);
  const { isToggleSidebar, setIsToggleSidebar } = context;

  const handleMenuOpen = (setter) => (event) => setter(event.currentTarget);
  const handleMenuClose = (setter) => () => setter(null);

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{ height: 80, justifyContent: "center" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Avatar
              src="https://static.vecteezy.com/system/resources/thumbnails/012/210/707/small/worker-employee-businessman-avatar-profile-icon-vector.jpg"
              alt="Logo"
              sx={{ width: 48, height: 48 }}
            />
            <Typography
              variant="h6"
              sx={{ ml: 1, fontWeight: 700, color: "#000" }}
            >
              ADMIN PANEL
            </Typography>
          </Link>
          <IconButton
            onClick={() => setIsToggleSidebar(!isToggleSidebar)}
            color="default"
          >
            <IoMenu size={24} />
          </IconButton>
        </Box>

        {/* Center Section - Search */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Search>
            <SearchIconWrapper>
              <CiSearch />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search here..." />
          </Search>
        </Box>

        {/* Right Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="default" onClick={handleMenuOpen(setThemeAnchor)}>
            <MdOutlineDarkMode size={22} />
          </IconButton>
          <Menu
            anchorEl={themeAnchor}
            open={Boolean(themeAnchor)}
            onClose={handleMenuClose(setThemeAnchor)}
          >
            <MenuItem onClick={handleMenuClose(setThemeAnchor)}>Enable Dark Mode</MenuItem>
            <MenuItem onClick={handleMenuClose(setThemeAnchor)}>System Theme</MenuItem>
          </Menu>

          <IconButton color="default" onClick={handleMenuOpen(setCartAnchor)}>
            <FiShoppingCart size={22} />
          </IconButton>
          <Menu
            anchorEl={cartAnchor}
            open={Boolean(cartAnchor)}
            onClose={handleMenuClose(setCartAnchor)}
          >
            <MenuItem>View Orders</MenuItem>
            <MenuItem>Manage Inventory</MenuItem>
          </Menu>

          <IconButton color="default" onClick={handleMenuOpen(setMailAnchor)}>
            <HiOutlineMail size={22} />
          </IconButton>
          <Menu
            anchorEl={mailAnchor}
            open={Boolean(mailAnchor)}
            onClose={handleMenuClose(setMailAnchor)}
          >
            <MenuItem>Inbox</MenuItem>
            <MenuItem>Send Message</MenuItem>
          </Menu>

          <IconButton color="default" onClick={handleMenuOpen(setNotifyAnchor)}>
            <IoMdNotificationsOutline size={22} />
          </IconButton>
          <Menu
            anchorEl={notifyAnchor}
            open={Boolean(notifyAnchor)}
            onClose={handleMenuClose(setNotifyAnchor)}
            PaperProps={{
              elevation: 3,
              sx: {
                width: 320,
                maxHeight: 400,
                overflowY: "auto",
                borderRadius: 2,
                mt: 1.5,
                p: 0,
              },
            }}
          >
            <Box p={1}>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                px={2}
                fontSize={14}
              >
                Messages (23)
              </Typography>
            </Box>
            <Divider />
            {[
              {
                name: "Miron Mahmud",
                time: "Now",
                message: "Lorem Ipsum has been the...",
                avatar: "https://randomuser.me/api/portraits/men/75.jpg",
              },
              {
                name: "Tahmina Bonny",
                time: "24s",
                message: "Lorem Ipsum has been the...",
                avatar: "https://randomuser.me/api/portraits/women/60.jpg",
              },
              {
                name: "Labonno Khan",
                time: "18m",
                message: "Lorem Ipsum has been the...",
                avatar: "https://randomuser.me/api/portraits/women/65.jpg",
              },
              {
                name: "Shipu Shikdar",
                time: "23h",
                message: "Lorem Ipsum has been the...",
                avatar: "https://randomuser.me/api/portraits/men/66.jpg",
              },
              {
                name: "Rabeya Akter",
                time: "13d",
                message: "Lorem Ipsum has been the...",
                avatar: "https://randomuser.me/api/portraits/women/67.jpg",
              },
            ].map((item, idx) => (
              <MenuItem
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 1,
                  "&:hover": {
                    backgroundColor: "#f9f9f9",
                  },
                }}
              >
                <Box display="flex" alignItems="center">
                  <Avatar src={item.avatar} sx={{ width: 36, height: 36, mr: 1 }} />
                  <Box>
                    <Typography variant="subtitle2" fontSize={13} noWrap>
                      {item.name} - {item.time}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize={12}
                      noWrap
                      width="180px"
                    >
                      {item.message}
                    </Typography>
                  </Box>
                </Box>
                <MoreVertIcon sx={{ fontSize: 18, color: "text.secondary" }} />
              </MenuItem>
            ))}
            <Divider />
            <Box textAlign="center" py={1}>
              <Button
                variant="contained"
                size="small"
                fullWidth
                sx={{
                  borderRadius: 0,
                  textTransform: "none",
                  backgroundColor: "#0d6efd",
                  fontSize: 13,
                  ":hover": { backgroundColor: "#0b5ed7" },
                }}
              >
                View All Messages
              </Button>
            </Box>
          </Menu>

          <Button
            variant="contained"
            component={Link}
            to="/login"
            sx={{ backgroundColor: "#00B4D8", textTransform: "none", fontWeight: 500 }}
          >
            Sign-In
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
