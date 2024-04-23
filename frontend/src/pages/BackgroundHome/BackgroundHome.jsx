import { useEffect, useState, useMemo } from "react";
import { Link, Routes, Route } from "react-router-dom";
import pestañas1 from "../../../public/images/pestañas3.jpg";
import trenzas1 from "../../../public/images/trenzas1.jpg";
import pestañas4 from "../../../public/images/pestañas2.jpeg";

import "./backgroundHome.css";

const BackgroundHome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = useMemo(() => [pestañas1, trenzas1, pestañas4], []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [images]);

  const imageUrl = images[currentIndex];

  return (
    <div className="Home-container">
      <div
        className="background-container"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>

      <div className="lis-container-home">
        <ul>
          <li>
            <Link to="/extensiones_pestanias">EXTENSIONES DE PESTAÑAS</Link>
          </li>
          <li>
            <Link to="/extensiones_pelo">EXTENSIONES DE PELO NATURAL</Link>
          </li>
          <li>
            <Link to="/limpiezas_faciales">LIMPIEZAS FACIALES</Link>
          </li>
          <li>
            <Link to="/trenzas_africanas">TRENZAS AFRICANAS</Link>
          </li>
          <li>
            <Link to="/microblading">MICROBLADING</Link>
          </li>
          <li>
            <Link to="/formaciones">FORMACIONES</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BackgroundHome;
