import React from "react";
import ReactDOM from "react-dom";
import App from "./Login";
import ProductList from "./product_list";
//import "./index.css";
import Description from "./Description";
import QrCodeScanner from "./QrCodeScanner";
import Login from "./Login";
import Contacts from "./Contact";
import Nav from "./Nav";
import NewLogin from "./NewLogin";

ReactDOM.render(
  <React.StrictMode>
    <NewLogin />
    {/* <Contacts /> */}
    {/* <Nav /> */}
    {/* <Login /> */}
    <QrCodeScanner />
    <ProductList />
  </React.StrictMode>,
  document.getElementById("root")
);
