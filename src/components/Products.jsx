import React, { useContext, useState } from "react";

import {
  Box,
  MenuItem,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Product from "./Product";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";
const Categories = ["All", "Personal Care", "Electronics", "Apparel"];
function Products({ products, setProducts, filterItemCategory, productData }) {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const authContext = useContext(AuthContext);
  useEffect(() => {
    filterItemCategory(category);
  }, [category]);
  const handleSort = (e) => {
    setSort(e.target.value);
    if (e.target.value === "Price: Low To High") {
      const newProd = [...products];
      newProd.sort((a, b) =>
        a.price > b.price ? 1 : a.price < b.price ? -1 : 0
      );
      setProducts(newProd);
    } else if (e.target.value === "Price:High To Low") {
      const newProd = [...products];
      newProd.sort((a, b) =>
        a.price < b.price ? 1 : a.price > b.price ? -1 : 0
      );
      setProducts(newProd);
    } else if (e.target.value === "Default") {
      setProducts(productData);
    }
  };
  if (!authContext.isLoggedIn) {
    return <Navigate to="/login" />;
  } else {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ToggleButtonGroup
          sx={{ marginTop: "25px" }}
          value={category}
          exclusive
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Platform"
        >
          {Categories?.map((cat) => (
            <ToggleButton value={cat} key={cat}>
              {cat}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Box sx={{ alignSelf: "flex-start", ml: 16 }}>
          <Box sx={{ mb: 1 }}>Sort By:</Box>
          <TextField
            id="select"
            label="Select"
            value={sort}
            size="small"
            onChange={(e) => handleSort(e)}
            select
            sx={{ width: "300px" }}
          >
            <MenuItem value={"Default"}>Default</MenuItem>
            <MenuItem value={"Price:High To Low"}>Price:High To Low</MenuItem>
            <MenuItem value={"Price: Low To High"}>Price: Low To High</MenuItem>
            <MenuItem value={"Newest"}>Newest</MenuItem>
          </TextField>
        </Box>

        <Box
          sx={{
            marginTop: "10px",
            width: "90%",
            padding: "20px",
          }}
        >
          <Stack
            direction={"row"}
            spacing={2}
            flexWrap={"wrap"}
            justifyContent="center"
            useFlexGap
          >
            {products?.map((product) => (
              <Product
                key={product.id}
                product={product}
                products={products}
                setProducts={setProducts}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    );
  }
}

export default Products;
