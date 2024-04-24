import { useState } from "react";
import DatePicker from "react-datepicker";
import SignatureCanvas from "react-signature-canvas";
import Button from "../../components/shared/botones/Button";
import "./Extensiones_pestanias.css";
import "react-datepicker/dist/react-datepicker.css";

function Extensiones_pestanias() {
  const [Date, setDate] = useState(null);

  return (
    <div className="forms_container_pestanias">
      <form className="forms-container">
        <h3>Rellene los espacios máximos posibles</h3>
        <div className="forms-datos-medicos">
          <label>¿Uso de lentillas?</label>
          <input type="checkbox" className="checkbox-custom"></input>
          <label>¿Tomas alguna medicación?</label>
          <input type="checkbox" className="checkbox-custom"></input>
          <label>¿Alguna reaccion alergica o estacional?</label>
          <input type="checkbox" className="checkbox-custom"></input>
          <label>¿Reaccion a los adhesivos, tiras o tiritas medicas?</label>
          <input type="checkbox" className="checkbox-custom"></input>
          <label>¿Alergia al hidrogel?</label>
          <input type="checkbox" className="checkbox-custom"></input>
          <label>¿Ojos sensibles o secos?</label>
          <input type="checkbox" className="checkbox-custom"></input>
          <label>¿Cirugia ocular en los últimos 4 meses?</label>
          <input type="checkbox" className="checkbox-custom"></input>
          <label>¿Maquillaje de ojos permanente?</label>
          <input type="checkbox" className="checkbox-custom"></input>
          <label>
            ¿Deficiencia de vitaminas o minerales que afecte a perdida de pelo y
            pestañas?
          </label>
          <input type="checkbox" className="checkbox-custom"></input>
          <label>¿Infeccion ocular recientemente?</label>
          <input type="checkbox" className="checkbox-custom"></input>
        </div>
        <label></label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          placeholder="Ingrese tu teléfono"
        ></input>
        <label></label>
        <input type="text" placeholder="Aplicación de pestañas"></input>
        <label></label>
        <input type="text" placeholder="Estilo de pestañas de pestañas"></input>
        <label></label>
        <input type="text" placeholder="Curva de las pestañas"></input>
        <label></label>
        <input type="text" placeholder="Largor de las pestañas"></input>
        <label></label>
        <input type="text" placeholder="Grosor de las pestañas"></input>
        <label></label>
        <input type="text" placeholder="Tipo de pestañas"></input>
        <label></label>
        <input type="text" placeholder="Tipo de Adhesivo"></input>
        <label htmlFor="fecha"></label>
        <DatePicker
          id="fecha"
          selected={Date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Día del ultimo retoque"
          wrapperClassName="mi-datepicker"
        />
        <label></label>
        <input type="text" placeholder="Notas Adicionales"></input>
        <label></label>
        <SignatureCanvas
          penColor="black"
          canvasProps={{
            width: 200,
            height: 100,
            className: "firma-canvas",
          }}
        />
        <span className="firma-placeholder">Firma aquí</span>
        <div className="button-container">
          <Button text={"Enviar"} />
          <Button text={"Clear"} />
        </div>
      </form>
    </div>
  );
}
export default Extensiones_pestanias;
