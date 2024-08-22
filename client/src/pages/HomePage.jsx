// import { useState } from "react";
import "./Home.css";
import Navbar from "../components/Navbar.jsx";
import Search from "../components/Search.jsx";

export default function HomePage() {
  return (
    <>
      <div>
        <Navbar />
        <Search />
      </div>
    </>
  );
}
