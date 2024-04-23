import { useEffect, useState, useMemo } from "react";
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
    <div
      className="background-container"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    />
  );
};

export default BackgroundHome;
