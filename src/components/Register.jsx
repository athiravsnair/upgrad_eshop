import {
  Box,
  Fab,
  Stack,
  TextField,
  Typography,
  Button,
  styled,
} from "@mui/material";
import React from "react";
import { LockOpen } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    contact_number: "",
  });
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
  const handleRegister = () => {
    const formData = { ...data, role: "user" };
    delete formData["confirm_password"];
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));
    toast.success("User Registered Successfully");
    navigate("/login");
  };
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
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
          <Typography variant="h5">Sign Up</Typography>
          <TextField
            type="text"
            required
            name="first_name"
            label="First Name"
            fullWidth
            value={data.first_name}
            onChange={handleChange}
          />
          <TextField
            type="text"
            required
            name="last_name"
            label="Last Name"
            value={data.last_name}
            onChange={handleChange}
            fullWidth
          />
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
            name="password"
            label="Password"
            value={data.password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            type="password"
            required
            name="confirm_password"
            label="Confirm Password"
            value={data.confirm_password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            type="number"
            required
            label="Contact Number"
            name="contact_number"
            value={data.contact_number}
            onChange={handleChange}
            fullWidth
          />
          <StyleButton
            variant="contained"
            sx={{ width: "100%" }}
            onClick={handleRegister}
          >
            Sign Up
          </StyleButton>
          <Box
            component={"span"}
            sx={{ alignSelf: "flex-end", fontSize: "14px" }}
          >
            <Link to="/login">Already have an Account? Sign In</Link>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default Register;
