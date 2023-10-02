import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { CurrencyRupee } from "@mui/icons-material";
import {
  Box,
  Stack,
  TextField,
  Typography,
  styled,
  Button,
} from "@mui/material";

const StyleButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#5439ee",
  "&:hover": {
    backgroundColor: "#2a14a7",
  },
}));

function BuyProduct({
  handleNext,
  data,
  setData,
  product,
  setProduct,
  products,
}) {
  const { id } = useParams();
  const getSingleProduct = useCallback(async () => {
    try {
      const res = products.find((prod) => prod.id == id);
      setProduct(res);
    } catch (err) {
      console.log(err);
    }
  }, [id]);
  useEffect(() => {
    getSingleProduct();
  }, [getSingleProduct]);
  const handleQuantity = (e) => {
    setData((prev) => ({ ...prev, quantity: e.target.value }));
  };
  return (
    <Box
      sx={{
        marginTop: "30px",
        width: "100%",
        height: "calc(100vh - 200px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "90%", height: "100%" }}>
        <Stack direction="row">
          <Box
            sx={{
              width: "50%",
              height: "calc(100vh - 200px)",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={product?.image}
              alt="pImg"
              style={{ width: "200", height: "300px" }}
            />
          </Box>
          <Box
            sx={{
              width: "50%",
              height: "calc(100vh - 200px)",

              padding: "50px 50px 50px 0px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Typography>
              Category: <b>{product?.category}</b>
            </Typography>
            <Typography variant="body1">{product?.description}</Typography>
            <Typography
              color="error"
              sx={{
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                mb: 4,
              }}
            >
              <CurrencyRupee />
              {Math.round(product?.price)}
            </Typography>
            <TextField
              label="Enter Quantity"
              type="number"
              value={data.quantity}
              onChange={handleQuantity}
              required
              sx={{ width: "300px" }}
            />
            <StyleButton
              variant="contained"
              sx={{ width: "150px" }}
              onClick={() => handleNext((prev) => prev + 1)}
            >
              Place Order
            </StyleButton>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default BuyProduct;
