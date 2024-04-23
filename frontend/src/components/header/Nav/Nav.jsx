import { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";

function NavMenu() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="user-container" onClick={openPopup}>
        <p>¿Ya eres cliente?</p>
      </div>

      {isPopupOpen && (
        <div className={`popup-overlay ${isPopupOpen ? "open" : ""}`}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <ul>
              <li>
                <Link to="/join">Registrate</Link>
              </li>
              <li>
                <Link to="/signIn">Inicia Sesión</Link>
              </li>
            </ul>
            <button onClick={closePopup}>X</button>
          </div>
        </div>
      )}
    </>
  );
}

export default NavMenu;
