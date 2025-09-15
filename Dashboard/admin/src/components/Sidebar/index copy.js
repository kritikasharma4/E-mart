import React, { useContext, useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
  Divider,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MessageIcon from "@mui/icons-material/Message";
import SettingsIcon from "@mui/icons-material/Settings";
import CategoryIcon from "@mui/icons-material/Category";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListAltIcon from "@mui/icons-material/ListAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { MyContext } from "../../App";

const Sidebar = () => {
  const [openProducts, setOpenProducts] = useState(false);
  const context = useContext(MyContext);

  const handleProductsClick = () => {
    setOpenProducts(!openProducts);
  };

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      link: "/dashboard",
    },
    {
      text: "Products",
      icon: <CategoryIcon />,
      subItems: [
        { text: "Product List", icon: <ListAltIcon />, link: "/product-list" },
        { text: "Product View", icon: <VisibilityIcon />, link: "/product" },
        { text: "Product Upload", icon: <CloudUploadIcon />, link: "/upload" },
      ],
    },
    {
      text: "Orders",
      icon: <ShoppingCartIcon />,
      link: "/orders",
    },
    {
      text: "Messages",
      icon: <MessageIcon />,
      link: "/messages",
    },
    {
      text: "Notifications",
      icon: <NotificationsNoneIcon />,
      link: "/notifications",
    },
    {
      text: "Settings",
      icon: <SettingsIcon />,
      link: "/settings",
    },
  ];

  return (
    <Box className="sidebar" display="flex" flexDirection="column" height="100vh">
      <List className="menu-list" sx={{ flexGrow: 1, pb: 6 }}>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.text === "Products" ? (
              <>
                <ListItem disablePadding className="menu-item">
                  <ListItemButton onClick={handleProductsClick}>
                    <ListItemIcon className="menu-icon">{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                    {openProducts ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openProducts} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding className="submenu">
                    {item.subItems.map((sub, i) => (
                      <ListItemButton
                        key={i}
                        component={Link}
                        to={sub.link}
                        sx={{ pl: 4 }}
                      >
                        <ListItemIcon>{sub.icon}</ListItemIcon>
                        <ListItemText primary={sub.text} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItem disablePadding className="menu-item">
                <ListItemButton component={Link} to={item.link}>
                  <ListItemIcon className="menu-icon">{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            )}
          </React.Fragment>
        ))}
        <Divider sx={{ my: 1 }} />
      </List>

      <Box p={1} sx={{ position: "absolute", bottom: 30, width: "100%" }}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            borderRadius: 2,
            backgroundColor: '#3f51b5',
            color: 'white',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#303f9f',
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
