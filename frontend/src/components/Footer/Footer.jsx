import logo1 from "../../../public/images/lashtrainer.png";
import "./Footer.css";

function Footer() {
  return (
    <div className="Footer-container">
      <div className="certificaciones">
        <img src={logo1} alt="Certificación 1" />
      </div>
      <p>
        Alejandra Quintero Studio <br /> © 2024
      </p>
      <nav>
        <ul>
          <li>
            <a href="#">INICIO</a>
          </li>
          <li>
            <a href="#">ACERCA DE NOSOTROS</a>
          </li>
          <li>
            <a href="#">CONTACTO</a>
          </li>
          <li>
            <a href="#">TIENDA</a>
          </li>
          <li>
            <a href="#">FORMACIONES</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Footer;
