import React from "react";
import {
  Box,
  Fab,
  Stack,
  TextField,
  Typography,
  Button,
  styled,
} from "@mui/material";
import { AuthContext } from "../App";
import { LockOpen } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (usr) => usr.email === data.email && usr.password === data.password
    );
    console.log(user);
    if (user) {
      authContext.loggedIn(user);
      toast.success("User LoggedIn Successfully");
      navigate("/");
    } else {
      toast.error("Email Or Password Not Matched");
    }
  };
  const StyledFab = styled(Fab)(({ theme }) => ({
    backgroundColor: "#eb1ceb",
    "&:hover": {
      backgroundColor: "#bd1cbd",
    },
  }));
  const StyleButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#5439ee",
    "&:hover": {
      backgroundColor: "#2a14a7",
    },
  }));
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 50px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "350px", padding: "10px" }}>
        <Stack spacing={1} alignItems="center">
          <StyledFab color="secondary" size="small" disableRipple>
            <LockOpen />
          </StyledFab>
          <Typography variant="h5">Sign In</Typography>

          <TextField
            type="email"
            required
            label="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            type="password"
            required
            label="Password"
            name="password"
            value={data.password}
            onChange={handleChange}
            fullWidth
          />

          <StyleButton
            variant="contained"
            sx={{ width: "100%" }}
            onClick={handleLogin}
          >
            Sign In
          </StyleButton>
          <Box
            component={"span"}
            sx={{ alignSelf: "flex-start", fontSize: "14px" }}
          >
            <Link to="/register">Dont have an Account? Sign Up</Link>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default Login;
