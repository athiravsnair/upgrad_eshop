import { Route, Routes } from "react-router-dom";

import CreateProduct from "./components/CreateProduct";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import PlaceOrder from "./components/PlaceOrder";
import Products from "./components/Products";
import Register from "./components/Register";
import EditProduct from "./components/EditProduct";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCallback } from "react";
import NotFound from "./components/NotFound";
export const AuthContext = React.createContext(null);
function App() {
  const [productData, setProductData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [products, setProducts] = useState([]);
  const fetchAllProducts = useCallback(async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
      setProductData(res.data);
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  const filterItemCategory = (category) => {
    if (category.toLowerCase() === "all") {
      setProducts(productData);
    } else {
      const newData = productData.filter(
        (pro) => pro.category.toLowerCase() === category.toLowerCase()
      );
      setProducts(newData);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);
  const loggedOut = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
  };
  const loggedIn = (user) => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setIsLoggedIn(true);
    setLoggedInUser(user);
  };
  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedIn) {
      setIsLoggedIn(true);
      setLoggedInUser(loggedIn);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        loggedInUser,
        setLoggedInUser,
        loggedOut,
        loggedIn,
      }}
    >
      <Navbar productData={productData} setProducts={setProducts} />
      <Routes>
        <Route
          path="/"
          element={
            <Products
              products={products}
              setProducts={setProducts}
              filterItemCategory={filterItemCategory}
              productData={productData}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/create-product"
          element={
            <CreateProduct
              setProducts={setProducts}
              setProductData={setProductData}
            />
          }
        />
        <Route
          path="/product/edit/:id"
          element={
            <EditProduct
              products={products}
              setProducts={setProducts}
              setProductData={setProductData}
            />
          }
        />
        <Route
          path="/product/:id"
          element={<PlaceOrder products={products} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
