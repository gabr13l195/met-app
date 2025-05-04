
import { useState } from "react";
import "./App.css";

const App = () => {

  const [termometroSeco, setTermometroSeco] = useState(0.0);
  const [termometroHumedo, setTermometroHumedo] = useState(0.0);


  // Fórmula Magnus-Tetens
  // const tensionVaporSaturacion = (T: number):number => {
  //   return 6.1121 * Math.exp((17.67 * T) / (243.5 + T));
  // };

  // Tensión de Vapor (Sprung)
  // const calcularTensionVapor = (Ts: number, Th: number):number => {
  //   const gamma = 0.66;
  //   return tensionVaporSaturacion(Th) - gamma * (Ts - Th);
  // };


  // Nueva fórmula basada en Excel
  const calcularTensionVapor = (Ts: number, Th: number, P: number): number => {
    const T_kelvin = Th + 273.16;

    const term1 = -7.90298 * (373.16 / T_kelvin - 1);
    const term2 = 5.02808 * Math.log10(373.16 / T_kelvin);
    const term3 = -1.3816e-7 * (Math.pow(10, 11.344 * (1 - T_kelvin / 373.16)) - 1);
    const term4 = 8.1328e-3 * (Math.pow(10, -3.49149 * (373.16 / T_kelvin - 1)) - 1);
    const term5 = 3.0057498;

    const log10_e = term1 + term2 + term3 + term4 + term5;
    const e = Math.pow(10, log10_e);

    const psicrometrico = (0.00066 * (1 + 0.00115 * Th)) * P * (Ts - Th);

    return e - psicrometrico;
  };

  // // Humedad Relativa
  // const calcularHumedadRelativa = (Ts: number, eActual: number): number => {
  //   return (eActual / calcularTensionVapor(Ts)) * 100;
  // };

  const calcularHumedadRelativa = (Ts: number, TV: number): number => {
    const T_kelvin = Ts + 273.16;

    const term1 = -7.90298 * (373.16 / T_kelvin - 1);
    const term2 = 5.02808 * Math.log10(373.16 / T_kelvin);
    const term3 = -1.3816e-7 * (Math.pow(10, 11.344 * (1 - T_kelvin / 373.16)) - 1);
    const term4 = 8.1328e-3 * (Math.pow(10, -3.49149 * (373.16 / T_kelvin - 1)) - 1);
    const term5 = 3.0057498;

    const log10_e_saturacion = term1 + term2 + term3 + term4 + term5;
    const e_saturacion = Math.pow(10, log10_e_saturacion);

    return (TV / e_saturacion) * 100;
  };

  // // Punto de Rocío
  // const calcularPuntoRocio = (eActual: number) => {
  //   return (243.5 * Math.log(eActual / 6.1121)) / (17.67 - Math.log(eActual / 6.1121));
  // };

  const calcularPuntoRocio = (TV: number): number => {
    return 237.3 / ((7.5 / (Math.log10(TV) - Math.log10(6.11))) - 1);
  };


  const eActual = calcularTensionVapor(termometroSeco, termometroHumedo, 1000);
  const humedadRelativa = calcularHumedadRelativa(termometroSeco, eActual);
  const puntoRocio = calcularPuntoRocio(eActual);

  return (
    <div className="contenedor-principal">
      <h1 className="titulo">Psicrómetro</h1>
      <h2 className="subtitulo">DATOS PSICROMÉTRICOS</h2>
  
      <div className="contenedor-inputs">
        <div className="columna-input">
          <h3>Termómetro Seco</h3>
          <input
            type="number"
            value={termometroSeco}
            onChange={(e) => setTermometroSeco(parseFloat(e.target.value))}
            className="campo-temperatura"
          />
        </div>
  
        <div className="columna-input">
          <h3>Termómetro Húmedo</h3>
          <input
            type="number"
            value={termometroHumedo}
            onChange={(e) => setTermometroHumedo(parseFloat(e.target.value))}
            className="campo-temperatura"
          />
        </div>
      </div>
  
      <div className="contenedor-resultados">
        <div className="columna-resultado">
          <h4>Humedad Relativa</h4>
          <p className="valor-resultado">{Math.round(humedadRelativa)}%</p>
        </div>
        <div className="columna-resultado">
          <h4>Tensión de Vapor</h4>
          <p className="valor-resultado">{eActual.toFixed(1)} hPa</p>
        </div>
        <div className="columna-resultado">
          <h4>Punto de Rocío</h4>
          <p className="valor-resultado">{puntoRocio.toFixed(1)} °C</p>
        </div>
      </div>
      <p className="footer">Elaborado por Wilmer Betancourt</p>
    </div>
  

  );
};

export default App;

