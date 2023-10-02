import { CurrencyRupee } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  styled,
  Button,
} from "@mui/material";
import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const StyleButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#5439ee",
  "&:hover": {
    backgroundColor: "#2a14a7",
  },
}));
function CheckOutPage({ setActiveStep, product, quantity, address }) {
  const navigate = useNavigate();
  const GoBack = () => setActiveStep((prev) => prev - 1);
  const HandlePlaceOrder = useCallback(() => {
    toast.success("Congratulation, Your Order is Placed");
    navigate("/");
  }, []);
  return (
    <Box
      sx={{ width: "100%", display: "flex", gap: 1, justifyContent: "center" }}
    >
      <Box
        sx={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack direction={"row"}>
          <Card sx={{ width: "60%" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 19 }}
                color="text.secondary"
                gutterBottom
              >
                Quantity : {quantity}
              </Typography>

              <Typography sx={{ mb: 1.5 }} color="text.primary">
                Category: <b>{product?.category}</b>
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {product?.description}
              </Typography>
              <Typography
                sx={{
                  mt: 1.5,
                  fontSize: 20,
                  display: "flex",
                  alignItems: "center",
                }}
                color="error"
              >
                Total Price: <CurrencyRupee />
                {product?.price * quantity}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ width: "40%" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 16 }}
                color="text.secondary"
                gutterBottom
              >
                {address?.city}
              </Typography>

              <Typography color="text.secondary" gutterBottom>
                Contact No: +91 {address?.contact_number}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {address?.street}
              </Typography>
              <Typography s color="text.secondary" gutterBottom>
                {address?.landmark}
              </Typography>
              <Typography s color="text.secondary" gutterBottom>
                {address?.state}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {address?.zipcode}
              </Typography>
            </CardContent>
          </Card>
        </Stack>
        <Box sx={{ display: "flex", gap: "20px", padding: "20px" }}>
          <Button
            variant="text"
            sx={{ width: "80px", color: "gray" }}
            onClick={GoBack}
          >
            Back
          </Button>
          <StyleButton
            variant="contained"
            sx={{ width: "150px" }}
            onClick={HandlePlaceOrder}
          >
            Place Order
          </StyleButton>
        </Box>
      </Box>
    </Box>
  );
}

export default CheckOutPage;
