import Titulo from "../shared/Logo/Titulo";
import NavMenu from "./Nav/Nav";
import "./header.css";

function Header() {
  return (
    <div className="header-container">
      <Titulo />
      <NavMenu />
    </div>
  );
}

export default Header;
