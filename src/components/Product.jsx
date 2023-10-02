import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { CurrencyRupee, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  styled,
  Button,
  IconButton,
  Modal,
} from "@mui/material";
const StyleButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#5439ee",
  "&:hover": {
    backgroundColor: "#2a14a7",
  },
}));
const style = {
  position: "absolute",
  top: "20px",
  left: "30%",
  width: 400,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};
function Product({ products, product, setProducts }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const handleClose = () => {
    setOpen(false);
  };
  const BuyProduct = (id) => {
    navigate(`/product/${id}`);
  };
  const handleEdit = (id) => {
    navigate("/product/edit/" + id);
  };
  const handleDelete = (id) => {
    setOpen(false);
    const prod = products.filter((prod) => prod.id != id);
    setProducts(prod);
  };
  return (
    <Card sx={{ width: 345 }} key={product.id}>
      <CardActionArea disableRipple>
        <CardMedia
          component="img"
          height="200"
          image={product?.image}
          alt="green iguana"
        />
        <CardContent
          sx={{
            height: "200px",
            overflowX: "hidden",
            overflowY: "scroll",
          }}
        >
          <Typography gutterBottom variant="body1" component="div">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems={"center"}
            >
              <Box
                component={"span"}
                sx={{
                  width: "70%",
                  overflowWrap: "break-word",
                  fontSize: "19px",
                  fontWeight: "bold",
                }}
              >
                {product?.title}
              </Box>
              <Box
                component={"span"}
                sx={{
                  width: "30%",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                <CurrencyRupee
                  sx={{
                    fontSize: "20px",
                  }}
                />
                {Math.round(product?.price)}
              </Box>
            </Stack>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product?.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <StyleButton
          variant="contained"
          size="small"
          onClick={() => BuyProduct(product?.id)}
        >
          Buy
        </StyleButton>
        {authContext.loggedInUser?.role === "admin" && (
          <Box component={"div"}>
            <Stack direction="row" gap="20px">
              <IconButton onClick={() => handleEdit(product.id)}>
                <Edit sx={{ color: "gray", cursor: "pointer" }} />
              </IconButton>
              <IconButton onClick={() => setOpen(true)}>
                <Delete sx={{ color: "gray", cursor: "pointer" }} />
              </IconButton>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Confirm Deletion Of Product
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Are You Sure You Want to Delete Product?
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: "15px",
                      pt: "15px",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(product.id)}
                    >
                      Ok
                    </Button>
                    <Button variant="outlined" onClick={handleClose}>
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </Stack>
          </Box>
        )}
      </CardActions>
    </Card>
  );
}

export default Product;
