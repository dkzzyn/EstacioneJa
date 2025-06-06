import React, { useState } from 'react';

const VehicleForm = ({ onRegisterVehicle }) => {
  // Estado único para armazenar os campos do formulário
  const [formData, setFormData] = useState({
    plate: '',
    model: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onRegisterVehicle(formData);

    setFormData({ plate: '', model: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Placa:</label>
        <input
          type="text"
          name="plate"
          value={formData.plate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Modelo:</label>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Registrar Entrada</button>
    </form>
  );
};

export default VehicleForm;
