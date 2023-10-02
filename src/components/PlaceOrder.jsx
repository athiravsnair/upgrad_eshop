import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import BuyProduct from "./BuyProduct";
import SelectAddress from "./SelectAddress";
import CheckOutPage from "./CheckOutPage";
import { useEffect } from "react";
const steps = ["Items", "Select Address", "Confirm Order"];
function PlaceOrder({ products }) {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [data, setData] = useState({ quantity: 1 });
  const [product, setProduct] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState({
    city: "",
    state: "",
    street: "",
    name: "",
    contact_number: "",
    zipcode: "",
    landmark: "",
  });
  useEffect(() => {
    const localAddress = JSON.parse(localStorage.getItem("address")) || [];
    setAddresses(localAddress);
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {activeStep !== 0 && (
        <Box sx={{ width: "700px", height: "70px", mt: 4 }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      )}
      {activeStep === 0 ? (
        <BuyProduct
          handleNext={setActiveStep}
          data={data}
          setData={setData}
          product={product}
          setProduct={setProduct}
          products={products}
        />
      ) : activeStep === 1 ? (
        <SelectAddress
          setActiveStep={setActiveStep}
          data={data}
          setData={setData}
          addresses={addresses}
          setAddresses={setAddresses}
          address={address}
          setAddress={setAddress}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
      ) : (
        <CheckOutPage
          setActiveStep={setActiveStep}
          data={data}
          setData={setData}
          product={product}
          quantity={data.quantity}
          address={addresses[selectedAddress]}
        />
      )}
    </Box>
  );
}

export default PlaceOrder;
