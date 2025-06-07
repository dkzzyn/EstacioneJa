import React, { useState } from 'react';
import './VehicleForm.css';

const VehicleForm = ({ onRegisterVehicle, vehicles }) => {
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

    const alreadyParked = vehicles.some(
      (vehicle) => vehicle.plate.toLowerCase() === formData.plate.toLowerCase()
    );

    if (alreadyParked) {
      alert('Este veículo já está estacionado.');
      return;
    }

    onRegisterVehicle(formData);
    setFormData({ plate: '', model: '' });
  };

  return (
    <form className="vehicle-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="plate">Placa</label>
        <input
          type="text"
          name="plate"
          id="plate"
          value={formData.plate}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>
      <div className="form-group">
        <label htmlFor="model">Modelo</label>
        <input
          type="text"
          name="model"
          id="model"
          value={formData.model}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>
      <button type="submit" className="register-btn">
        Registrar Entrada
      </button>
    </form>
  );
};

export default VehicleForm;
