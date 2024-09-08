// import { useState } from "react";
import "./Home.css";
import Navbar from "../components/Navbar.jsx";
import Sheet from "../components/Sheet.jsx";
import Sheet_copy from "../components/Sheet_copy.jsx";
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
        {/* <Sheet_copy /> */}
      </Box>
    </>
  );
}
