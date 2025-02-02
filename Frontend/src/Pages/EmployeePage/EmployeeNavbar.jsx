import React, { useState, useContext, useEffect } from "react";
import {
  MenuItem,
  Tooltip,
  Button,
  Avatar,
  Container,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { MdOutlineTableBar } from "react-icons/md";
import { FiMessageCircle } from "react-icons/fi";
import { CartContext, ItemContext, AuthContext } from "../../App.jsx";
import Popup from "../../Components/Popup";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function EmployeeNavbar({ reservedTable }) {
  const [user, setUser] = useState([]);
  const pages = ["Products", "Pricing"];
  const settings = [user.Username, "Dashboard", "Logout"];
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { popupVisiblilty, setPopupVisiblilty } = useContext(CartContext);
  const { setLoading } = useContext(ItemContext);
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setLoading(true);
    setPopupVisiblilty(false);
    setTimeout(() => {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      localStorage.removeItem("isAuthenticated");
      setLoading(false);
    }, 3000);
  };

  const handleSettingsAction = (setting) => {
    if (setting === "Logout") {
      setAnchorElUser(null);
      setPopupVisiblilty(true);
    } else if (setting === "Profile") {
      console.log(setting);
    } else if (setting === "Dashboard") {
      {
        user.access_level !== "admin"
          ? setPopupVisiblilty("unauthorized")
          : window.open("http://localhost:5174", "_blank");
      }
      handleCloseUserMenu();
    } else {
      handleCloseUserMenu();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    } else {
      console.error("No token found");
    }

    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <AppBar position="static" style={{ backgroundColor: "#008cba" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Roboto",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TableMate
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Roboto",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TableMate
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  if (page === "Products") {
                    window.location.href = `http://localhost:5000/api/menu`;
                  } else if (page === "Pricing") {
                    window.location.href = `http://localhost:5173/Home`;
                  }
                  handleCloseNavMenu;
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              columnGap: "7px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              size="large"
              aria-label="show new notifications"
              color="inherit"
            >
              <Badge badgeContent="9+" color="error">
                <FiMessageCircle />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show new notifications"
              title="Booked Table"
              color="inherit"
            >
              <Badge badgeContent={reservedTable.length} color="error">
                <MdOutlineTableBar />
              </Badge>
            </IconButton>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.Username} src={user.photo} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, i) => (
                  <MenuItem
                    key={i}
                    onClick={() => handleSettingsAction(setting)}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
      {popupVisiblilty === true && (
        <Popup
          greeting="Logout!"
          message={<p>Are you sure you want to Logout?</p>}
          addButtons={
            <button
              className="close-btn"
              style={{ backgroundColor: "red" }}
              onClick={handleLogout}
            >
              Logout
            </button>
          }
        />
      )}
      {popupVisiblilty === "unauthorized" && (
        <Popup
          greeting="Unauthorized Access!"
          message={<p>You are not authorized to use Dashboard.</p>}
        />
      )}
    </AppBar>
  );
}

export default EmployeeNavbar;
