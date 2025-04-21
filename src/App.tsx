
import { useState } from "react";
import "./App.css";

const App = () => {

  const [termometroSeco, setTermometroSeco] = useState(26.3);
  const [termometroHumedo, setTermometroHumedo] = useState(23.2);


  // Fórmula Magnus-Tetens
  const tensionVaporSaturacion = (T: number) => {
    return 6.1121 * Math.exp((17.67 * T) / (243.5 + T));
  };

  // Tensión de Vapor (Sprung)
  const calcularTensionVapor = (Ts:number, Th:number) => {
    const gamma = 0.66;
    return tensionVaporSaturacion(Th) - gamma * (Ts - Th);
  };

  // Humedad Relativa
  const calcularHumedadRelativa = (Ts:number, eActual:number) => {
    return (eActual / tensionVaporSaturacion(Ts)) * 100;
  };

  // Punto de Rocío
  const calcularPuntoRocio = (eActual:number) => {
    return (243.5 * Math.log(eActual / 6.1121)) / (17.67 - Math.log(eActual / 6.1121));
  };

  const eActual = calcularTensionVapor(termometroSeco, termometroHumedo);
  const humedadRelativa = calcularHumedadRelativa(termometroSeco, eActual);
  const puntoRocio = calcularPuntoRocio(eActual);

  return (
    <div>
      <h1>Psicrómetro</h1>
      <h2>DATOS PSICROMÉTRICOS</h2>
      <div>
        <h3>Termómetro Seco</h3>
        <input
          type="number"
          value={termometroSeco}
          onChange={(e) => setTermometroSeco(parseFloat(e.target.value))}
          placeholder="Termómetro Seco"
        /> <br />
        <h3>Termómetro Húmedo</h3>
        <input
          type="number"
          value={termometroHumedo}
          onChange={(e) => setTermometroHumedo(parseFloat(e.target.value))}
          placeholder="Termómetro Húmedo"
        />
      </div>

      <div>
        <h3>Humedad Relativa: {Math.round(humedadRelativa)}%</h3>
        <h3>Tensión de Vapor: {eActual.toFixed(1)} hPa</h3>
        <h3>Punto de Rocío: {puntoRocio.toFixed(1)} °C</h3>
      </div>
    </div>
  );
};

export default App;

