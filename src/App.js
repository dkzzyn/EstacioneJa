import { useState } from 'react';
import './App.css';
import VehicleForm from './components/VeiculosForm';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [exitHistory, setExitHistory] = useState([]);

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

    // Atualiza o histórico de saída
    setExitHistory((prevHistory) => [
      ...prevHistory,
      {
        ...vehicle,
        exitTime,
        timeDiffMin,
        totalPrice,
      },
    ]);

    // Remove o veículo da lista atual
    setVehicles((prevVehicles) => prevVehicles.filter((_, i) => i !== index));
  };

  // Filtra veículos pela placa digitada
  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>EstacioneJá</h1>

      <VehicleForm onRegisterVehicle={handleRegisterVehicle} />

      {/* Campo de filtro */}
      <input
        type="text"
        placeholder="Buscar por placa"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '10px', marginBottom: '20px', width: '60%' }}
      />

      {/* Lista de veículos filtrados */}
      <ul>
        {filteredVehicles.map((vehicle, index) => (
          <li key={index}>
            Placa: {vehicle.plate} | Modelo: {vehicle.model} | Entrada: {vehicle.entryTime.toLocaleString()}{' '}
            <button onClick={() => handleRemoveVehicle(index)}>Finalizar</button>
          </li>
        ))}
      </ul>

      {/* Aqui você pode mostrar o histórico de saída, se quiser */}
      <h2>Histórico de Saída</h2>
      <ul>
        {exitHistory.map((vehicle, index) => (
          <li key={index}>
            Placa: {vehicle.plate} | Modelo: {vehicle.model} | Entrada: {vehicle.entryTime.toLocaleString()} | Saída: {vehicle.exitTime.toLocaleString()} | Tempo: {vehicle.timeDiffMin} min | Valor: R$ {vehicle.totalPrice.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
