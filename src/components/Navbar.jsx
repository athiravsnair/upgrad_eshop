import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";

import React, { useContext, useState } from "react";
import { ShoppingCart } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router-dom";

import { purple } from "@mui/material/colors";
import { AuthContext } from "../App";
const links = [
  { linkName: "Home", href: "/" },
  { linkName: "New Product", href: "/create-product" },
];
const loginLink = [
  { linkName: "Login", href: "/login" },
  { linkName: "Register", href: "/register" },
];

function Navbar({ productData, setProducts }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({ search_value: "" });
  const authContext = useContext(AuthContext);
  const NavLinks = authContext.isLoggedIn ? links : loginLink;
  const handleLogout = () => {
    authContext.loggedOut();
    navigate("/login");
  };

  const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: "#eb1ceb",
    "&:hover": {
      backgroundColor: "#bd1cbd",
    },
  }));
  const StyledTextField = styled(TextField)(({ theme }) => ({
    color: "#fff",
    background: "rgba(255, 255, 255, 0.15)",
    borderRadius: "4px",
    width: "100%",
    "& input": {
      color: "#fff !important",
    },
    "& fieldset": {
      borderWidth: "0px",
      "& fieldset:hover, & fieldset:focus, & fieldset:active": {
        borderWidth: "0px",
      },
      "& .MuiInputBase-input": {
        padding: theme.spacing(2, 1, 1, 2),
        transition: theme.transitions.create("width"),
        color: "#fff",
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          width: "12ch",
          "&:focus": {
            width: "20ch",
          },
        },
      },
    },
  }));
  return (
    <Box sx={{ flexGrow: 1, height: "50px" }}>
      <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" size="medium">
              <ShoppingCart />
            </IconButton>
            <Typography
              variant="h6"
              component={"div"}
              onClick={() => navigate("/")}
              sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
            >
              upGrad E-Shop
            </Typography>
          </Box>
          {authContext.isLoggedIn && (
            <Box sx={{ width: "350px" }}>
              <StyledTextField
                autoFocus
                name="search_value"
                value={data.search_value}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                  const product = productData.filter((prod) =>
                    prod.title.toLowerCase().includes(e.target.value)
                  );
                  setProducts(product);
                }}
                sx={{ "& fieldset": { border: "none" }, width: "100%" }}
                placeholder="Search..."
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        style={{ color: "white", marginLeft: "8px" }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          )}

          <Box sx={{ display: "flex", gap: "30px", alignItems: "center" }}>
            {NavLinks?.map((link) => (
              <Link
                key={link.linkName}
                color="inherit"
                onClick={() => {
                  navigate(link.href);
                }}
                sx={{
                  display:
                    link.linkName === "New Product" &&
                    authContext.loggedInUser?.role !== "admin"
                      ? "none"
                      : "flex",
                  cursor: "pointer",
                  textDecoration:
                    link.href === location.pathname ? "underline" : "none",
                }}
              >
                {link.linkName}
              </Link>
            ))}
            {authContext.isLoggedIn && (
              <StyledButton variant="contained" onClick={handleLogout}>
                Logout
              </StyledButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
