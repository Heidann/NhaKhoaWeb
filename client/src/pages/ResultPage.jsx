// import { useState } from "react";
import "./Home.css";
import Navbar from "../components/Navbar.jsx";
import Result from "../components/Result.jsx";

export default function HomePage() {
  return (
    <>
      <div>
        <Navbar />
        <Result />
      </div>
    </>
  );
}
