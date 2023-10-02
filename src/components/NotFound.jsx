import React from "react";
import IMG from "../img/notFoundImg.gif";
import { Box } from "@mui/material";
function NotFound() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        background: "smokewhite",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={IMG} width="400px" height="400px" alt="NotFoundImg" />
    </Box>
  );
}

export default NotFound;
