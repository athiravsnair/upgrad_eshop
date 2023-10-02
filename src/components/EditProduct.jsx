import React, { useContext, useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Typography,
  styled,
  Button,
} from "@mui/material";
import CreatableSelect from "react-select/creatable";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { AuthContext } from "../App";
const StyleButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#5439ee",
  "&:hover": {
    backgroundColor: "#2a14a7",
  },
}));
function EditProduct({ products, setProducts, setProductData }) {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { id } = useParams();
  const [data, setData] = useState({
    category: { label: "Furniture", value: "Furniture" },
    name: "",
    price: "",
    manufacturer: "",
    avialable_item: "",
    image_url: "",
    description: "",
  });
  useEffect(() => {
    const newProduct = products.find((prod) => prod.id == id);
    console.log(newProduct);
    setData({
      ...newProduct,
      category: {
        label: newProduct?.category,
        value: newProduct?.category.toLowerCase(),
      },
      name: newProduct?.title,
      image_url: newProduct?.image,
      avialable_item: newProduct?.avialable_item || 20,
      manufacturer: newProduct?.manufacturer || "Akash Mehta",
    });
  }, [id]);

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([
    { value: "Apperal", label: "Apperal" },
    { label: "Electronics", value: "Electronics" },
  ]);
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleModify = () => {
    if (
      !data.name ||
      !data.manufacturer ||
      !data.image_url ||
      !data.category ||
      !data.price ||
      !data.avialable_item
    ) {
      toast.error("Please Fill the Required Field ");
      return;
    } else {
      const newProduct = products.map((prod) => {
        if (prod.id == id) {
          return {
            ...data,
            image: data.image_url,
            title: data.name,
            category: data.category.label,
          };
        } else {
          return prod;
        }
      });

      setProducts(newProduct);
      setProductData(newProduct);
      setData({
        category: { label: "Furniture", value: "Furniture" },
        name: "",
        price: "",
        manufacturer: "",
        avialable_item: "",
        image_url: "",
        description: "",
      });
      toast.success("Product Modified Successfully");
      navigate("/");
    }
  };
  const handleCreate = (value) => {
    setLoading(true);
    setTimeout(() => {
      const newOption = {
        label: value,
        value: value.toLowerCase().replace(/\W/g, ""),
      };
      setLoading(false);
      setOptions((prev) => [...prev, newOption]);
      setData((prev) => ({ ...prev, category: newOption }));
    }, 1000);
  };
  if (authContext.isLoggedIn && authContext.loggedInUser?.role !== "admin") {
    return <Navigate to="/" replace="true" />;
  } else {
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
            <Typography variant="h5">Modify Product</Typography>
            <TextField
              type="text"
              required
              name="name"
              value={data.name}
              onChange={handleChange}
              label="Name"
              fullWidth
            />
            <CreatableSelect
              id="select"
              styles={{ menu: (base) => ({ ...base, zIndex: 100 }) }}
              isClearable
              isDisabled={loading}
              isLoading={loading}
              onChange={(newValue) =>
                setData((prev) => ({ ...prev, category: newValue }))
              }
              onCreateOption={handleCreate}
              options={options}
              value={data.category}
            />
            <TextField
              type="text"
              required
              name="manufacturer"
              value={data.manufacturer}
              onChange={handleChange}
              label="Manufacturer"
              fullWidth
            />
            <TextField
              type="number"
              required
              label="Avaialable Items"
              name="avialable_item"
              value={data.avialable_item}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              type="number"
              required
              label="Price"
              name="price"
              value={data.price}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              type="text"
              required
              label="Image URL"
              name="image_url"
              value={data.image_url}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              type="text"
              required
              name="description"
              value={data.description}
              onChange={handleChange}
              label="Product Description"
              fullWidth
            />
            <StyleButton
              variant="contained"
              sx={{ width: "100%" }}
              onClick={handleModify}
            >
              Modify Product
            </StyleButton>
          </Stack>
        </Box>
      </Box>
    );
  }
}

export default EditProduct;
