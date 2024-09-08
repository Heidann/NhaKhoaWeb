// import { useState } from "react";
import "./Home.css";
import Navbar from "../components/Navbar.jsx";
import Sheet from "../components/Sheet.jsx";
import { Box } from "@mui/material";

export default function HomePage() {
  return (
    <>
      <Box>
        <Navbar />
        <Sheet />
      </Box>
    </>
  );
}
