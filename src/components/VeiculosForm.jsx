import React, { useState } from 'react';
import './VehicleForm.css'; // ← Importando o CSS

const VehicleForm = ({ onRegisterVehicle }) => {
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
