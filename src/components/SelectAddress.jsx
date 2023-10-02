import {
  Box,
  MenuItem,
  TextField,
  Typography,
  styled,
  Button,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
const StyleButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#5439ee",
  "&:hover": {
    backgroundColor: "#2a14a7",
  },
}));
function SelectAddress({
  setActiveStep,
  addresses,
  setAddresses,
  address,
  setAddress,
  selectedAddress,
  setSelectedAddress,
}) {
  const [error, setError] = useState("");
  const GoBack = () => setActiveStep((prev) => prev - 1);
  const GoNext = () => {
    console.log(selectedAddress);
    if (selectedAddress === "") {
      setError("Please Select Address");
      return;
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };
  const handleChange = (e) => {
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSaveAddress = () => {
    const addressLocalhost =
      JSON.parse(localStorage.getItem("addresses")) || [];
    addressLocalhost.push(address);
    setAddresses((prev) => [...prev, address]);
    localStorage.setItem("address", JSON.stringify(addressLocalhost));
    setAddress({
      city: "",
      state: "",
      street: "",
      name: "",
      contact_number: "",
      zipcode: "",
      landmark: "",
    });
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Box sx={{ marginTop: "20px", display: "flex", flexDirection: "column" }}>
        <Box sx={{ mb: 1 }}>Select Address:</Box>
        <TextField
          id="select"
          label="Select"
          value={selectedAddress}
          size="small"
          onChange={(e) => setSelectedAddress(e.target.value)}
          select
          sx={{ width: "500px" }}
        >
          {addresses?.map((add, idx) => (
            <MenuItem value={idx} key={idx}>
              {`${add.street}---> ${add.landmark},${add.city}`}
            </MenuItem>
          ))}
        </TextField>
        {error && (
          <Box component={"span"} sx={{ color: "red" }}>
            {error}
          </Box>
        )}
      </Box>
      <Box sx={{ width: "350px", padding: "10px" }}>
        <Stack direction="column" gap="10px" alignItems="center">
          <Typography variant="h5">Add Address</Typography>
          <TextField
            type="text"
            required
            name="name"
            label="Name"
            value={address.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            type="number"
            required
            name="contact_number"
            value={address.contact_number}
            onChange={handleChange}
            label="Contact Number"
            fullWidth
          />
          <TextField
            type="text"
            required
            name="street"
            value={address.street}
            onChange={handleChange}
            label="Street"
            fullWidth
          />
          <TextField
            type="text"
            required
            label="City"
            name="city"
            value={address.city}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            type="text"
            required
            label="State"
            name="state"
            value={address.state}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            type="text"
            required
            label="LandMark"
            name="landmark"
            value={address.landmark}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            type="number"
            required
            label="zipcode"
            name="zipcode"
            value={address.zipcode}
            onChange={handleChange}
            fullWidth
          />
          <StyleButton
            variant="contained"
            sx={{ width: "100%" }}
            onClick={handleSaveAddress}
          >
            Save Address
          </StyleButton>
        </Stack>
      </Box>

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
          sx={{ width: "80px" }}
          onClick={GoNext}
        >
          Next
        </StyleButton>
      </Box>
    </Box>
  );
}

export default SelectAddress;
