// import { useState } from "react";
import "./Home.css";
import Navbar from "../components/Navbar.jsx";
import Sheet from "../components/Sheet.jsx";
import { Box } from "@mui/material";

export default function HomePage() {
  return (
    <>
      <Box
        sx={{
          minWidth: {
            xs: 250,
            sm: 700,
            md: 900,
            lg: 1600,
          },
        }}
      >
        <Navbar />
        <Sheet />
      </Box>
    </>
  );
}
