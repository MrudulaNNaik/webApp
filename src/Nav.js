import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import ProductList from "./product_list";
import QrCodeScanner from "./QrCodeScanner";
function Nav() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/product" element={<ProductList />} />
        <Route path="/scanner" element={<QrCodeScanner />} />
      </Routes>
    </Router>
  );
}

export default Nav;
