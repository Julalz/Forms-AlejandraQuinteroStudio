import { useState } from "react";
import { Link } from "react-router-dom";
import Titulo from "../shared/Logo/Titulo";
import NavMenu from "./Nav/Nav";

import "./header.css";

function Header() {
  return (
    <>
      <div className="header-container">
        <Link to={"/"}>
          <Titulo />
        </Link>
        <NavMenu />
      </div>
    </>
  );
}

export default Header;
