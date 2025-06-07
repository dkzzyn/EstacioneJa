import { useState } from 'react';
import './App.css';
import VehicleForm from '../src/components/VeiculosForm';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [exitHistory, setExitHistory] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleRegisterVehicle = (vehicleData) => {
    const newVehicle = {
      ...vehicleData,
      entryTime: new Date(),
    };
    setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
  };

  const handleRemoveVehicle = (index) => {
    const vehicle = vehicles[index];
    const exitTime = new Date();
    const timeDiffMs = exitTime - vehicle.entryTime;
    const timeDiffMin = Math.ceil(timeDiffMs / 60000);
    const pricePerMinute = 0.5;
    const totalPrice = timeDiffMin * pricePerMinute;

    alert(`O veículo ${vehicle.plate} ficou estacionado por ${timeDiffMin} minutos. Valor a pagar: R$ ${totalPrice.toFixed(2)}`);

    setExitHistory((prevHistory) => [
      ...prevHistory,
      {
        ...vehicle,
        exitTime,
        timeDiffMin,
        totalPrice,
      },
    ]);

    setVehicles((prevVehicles) => prevVehicles.filter((_, i) => i !== index));
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  return (
    <div className="App">
      <h1>EstacioneJá</h1>

      <VehicleForm onRegisterVehicle={handleRegisterVehicle} vehicles={vehicles} />

      <input
        type="text"
        placeholder="Buscar por placa"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searchInput"
      />

      <ul className="vehicle-list">
        {filteredVehicles.map((vehicle, index) => (
          <li key={index} className="vehicle-item">
            Placa: {vehicle.plate} | Modelo: {vehicle.model} | Entrada: {vehicle.entryTime.toLocaleString()}{' '}
            <button onClick={() => handleRemoveVehicle(index)} className="finalize-btn">Finalizar</button>
          </li>
        ))}
      </ul>

      <button className="toggle-history-btn" onClick={toggleHistory}>
        {isHistoryOpen ? 'Fechar Histórico' : 'Abrir Histórico'}
      </button>

      {isHistoryOpen && (
        <div className="history-modal">
          <h2>Histórico de Saída</h2>
          <ul className="history-list">
            {exitHistory.length === 0 && <p>Nenhum histórico para mostrar.</p>}
            {exitHistory.map((vehicle, index) => (
              <li key={index} className="history-item">
                Placa: {vehicle.plate} | Modelo: {vehicle.model} | Entrada: {vehicle.entryTime.toLocaleString()} | Saída: {vehicle.exitTime.toLocaleString()} | Tempo: {vehicle.timeDiffMin} min | Valor: R$ {vehicle.totalPrice.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
