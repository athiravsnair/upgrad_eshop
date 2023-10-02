import {
  Box,
  Stack,
  TextField,
  Typography,
  styled,
  Button,
} from "@mui/material";
import CreatableSelect from "react-select/creatable";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
const StyleButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#5439ee",
  "&:hover": {
    backgroundColor: "#2a14a7",
  },
}));
function CreateProduct({ setProducts, setProductData }) {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [data, setData] = useState({
    category: { label: "Furniture", value: "Furniture" },
    name: "",
    price: "",
    manufacturer: "",
    avialable_item: "",
    image_url: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([
    { value: "Apperal", label: "Apperal" },
    { label: "Electronics", value: "Electronics" },
  ]);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
  const handleRegister = () => {
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
      console.log({
        ...data,
        id: uuid(),
        image: data.image_url,
        title: data.name,
        category: data.category.label,
      });
      setProducts((prev) => [
        {
          ...data,
          id: uuid(),
          image: data.image_url,
          title: data.name,
          category: data.category.label,
        },
        ...prev,
      ]);
      setProductData((prev) => [
        {
          ...data,
          id: uuid(),
          image: data.image_url,
          title: data.name,
          category: data.category.label,
        },
        ...prev,
      ]);
      setData({
        category: { label: "Furniture", value: "Furniture" },
        name: "",
        price: "",
        manufacturer: "",
        avialable_item: "",
        image_url: "",
        description: "",
      });
      navigate("/");
    }
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
            <Typography variant="h5">Add Product</Typography>
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
              onClick={handleRegister}
            >
              Save Product
            </StyleButton>
          </Stack>
        </Box>
      </Box>
    );
  }
}

export default CreateProduct;
