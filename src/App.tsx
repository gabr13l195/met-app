import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TemperatureInput from "./components/TemperatureInput";
import ResultCard from "./components/ResultCard";
import { calcularTodosParametros } from "./utils/psicrometricCalculations";

const App = () => {
  const [termometroSeco, setTermometroSeco] = useState(0.0);
  const [termometroHumedo, setTermometroHumedo] = useState(0.0);

  const { humedadRelativa, tensionVapor, puntoRocio } = calcularTodosParametros(
    termometroSeco,
    termometroHumedo
  );

  return (
    <div className="app-container">
      <Header />

      <section className="inputs-section">
        <div className="inputs-grid">
          <TemperatureInput
            label="Termómetro Seco"
            value={termometroSeco}
            onChange={setTermometroSeco}
            icon="🌡️"
          />
          <TemperatureInput
            label="Termómetro Húmedo"
            value={termometroHumedo}
            onChange={setTermometroHumedo}
            icon="💧"
          />
        </div>
      </section>

      <section className="results-section">
        <div className="results-grid">
          <ResultCard
            title="Humedad Relativa"
            value={`${Math.round(humedadRelativa)}%`}
            icon="💨"
            color="#4a90e2"
          />
          <ResultCard
            title="Tensión de Vapor"
            value={`${tensionVapor.toFixed(1)} hPa`}
            icon="📊"
            color="#50c878"
          />
          <ResultCard
            title="Punto de Rocío"
            value={`${puntoRocio.toFixed(1)} °C`}
            icon="💧"
            color="#ff6b9d"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default App;

