import React from "react";
import { Link } from "react-router-dom";
import "./layout.css";

const Header = () => (
  <header className="main_header">
    <Link to="/" className="header_link">
      <h2>Flash Explorer</h2>
    </Link>
  </header>
);

export default Header;
