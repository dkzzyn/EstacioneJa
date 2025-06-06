import { useState } from "react";
import VehicleForm from "./components/VeiculosForm";
import "./App.css";

export default function App() {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [exitHistory, setExitHistory] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleRegisterVehicle = (vehicleData) => {
    const newVehicle = { ...vehicleData, entryTime: new Date() };
    setVehicles((prev) => [...prev, newVehicle]);
  };

  const handleRemoveVehicle = (index) => {
    const vehicle = vehicles[index];
    const exitTime = new Date();
    const timeDiffMs = exitTime - vehicle.entryTime;
    const timeDiffMin = Math.ceil(timeDiffMs / 60000);
    const pricePerMinute = 0.5;
    const totalPrice = timeDiffMin * pricePerMinute;

    alert(
      `O veículo ${vehicle.plate} ficou estacionado por ${timeDiffMin} minutos. Valor a pagar: R$ ${totalPrice.toFixed(
        2
      )}`
    );

    setExitHistory((prev) => [
      ...prev,
      { ...vehicle, exitTime, timeDiffMin, totalPrice },
    ]);

    setVehicles((prev) => prev.filter((_, i) => i !== index));
  };

  const filteredVehicles = vehicles.filter((v) =>
    v.plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>EstacioneJá 🚗</h1>

      <VehicleForm onRegisterVehicle={handleRegisterVehicle} />

      <input
        className="searchInput"
        type="text"
        placeholder="Buscar por placa..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="container">
        <div className="left">
          <h2>Veículos Estacionados</h2>
          {filteredVehicles.length === 0 && (
            <p className="emptyMessage">Nenhum veículo encontrado</p>
          )}
          <ul className="vehicleList">
            {filteredVehicles.map((vehicle, i) => (
              <li key={i} className="vehicleItem">
                <div>
                  <strong>{vehicle.plate}</strong> - {vehicle.model} <br />
                  Entrada: {vehicle.entryTime.toLocaleString()}
                </div>
                <button
                  className="btnFinish"
                  onClick={() => handleRemoveVehicle(i)}
                  title="Finalizar Estacionamento"
                >
                  Finalizar
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="right">
          <h2>Histórico de Saída</h2>
          <button
            className="btnToggleHistory"
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
          >
            {isHistoryOpen ? "Fechar Histórico" : "Abrir Histórico"}
          </button>

          {isHistoryOpen && (
            <ul className="historyList">
              {exitHistory.length === 0 && (
                <p className="emptyMessage">Nenhum veículo finalizado ainda.</p>
              )}
              {exitHistory.map((v, i) => (
                <li key={i} className="historyItem">
                  <div>
                    <strong>{v.plate}</strong> - {v.model}
                    <br />
                    Entrada: {v.entryTime.toLocaleString()}
                    <br />
                    Saída: {v.exitTime.toLocaleString()}
                    <br />
                    Tempo: {v.timeDiffMin} min
                    <br />
                    Valor: R$ {v.totalPrice.toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
