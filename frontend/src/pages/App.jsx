import { Routes, Route } from "react-router-dom";
import Header from "../components/header/Header";
import Home from "./Home/Home";
import Footer from "../components/Footer/Footer";
import Extensiones_pestanias from "./Extensiones_pestanias/Extensiones_pestanias";
import Extensiones_pelo from "./Extensiones_pelo/Extensiones_pelo";
import Limpiezas_faciales from "./Limpiezas_faciales/Limpiezas_faciales";
import Microblading from "./Microblading/Microblading";
import Trenzas from "./Trenzas_africanas/Trenzas";
import Join from "./Join/Join";

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/extensiones_pestanias"
          element={<Extensiones_pestanias />}
        />
        <Route path="/extensiones_pelo" element={<Extensiones_pelo />} />
        <Route path="/limpiezas_faciales" element={<Limpiezas_faciales />} />
        <Route path="/microblading" element={<Microblading />} />
        <Route path="/trenzas_africanas" element={<Trenzas />} />
        <Route path="/join" element={<Join />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
