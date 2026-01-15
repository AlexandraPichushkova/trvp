import React, { useState, useEffect } from 'react';
import { getServiceTypes, addServiceType } from '../../requests';

export default function AddServiceType({ setShown }) {
  const [service_type_name, setName] = useState('');
  const [typesList, setTypesList] = useState([]);

  useEffect(() => {
    getServiceTypes().then((data) => setTypesList(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const exists = typesList.some(
      (t) => t.service_type_name.toLowerCase() === service_type_name.toLowerCase()
    );
    if (exists) {
      alert('Тип услуги с таким названием уже существует.');
      return;
    }

    try {
      await addServiceType({ service_type_name });
      setShown(false);
      window.location.reload();
    } catch (error) {
      alert('Ошибка при добавлении типа услуги');
      console.error(error);
    }
  };

  return (
    <div className="form-block">
      <h2>
        <i className="fas fa-layer-group"></i>
        Добавление типа услуги
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-input-block">
          <label><i className="fas fa-tag"></i> Название типа:</label>
          <input
            type="text"
            value={service_type_name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Например: Мобильный интернет"
          />
        </div>

        <div className="buttons-block">
          <button className="grey-button" onClick={() => setShown(false)}>
            <i className="fas fa-times"></i> Отменить
          </button>
          <button className="filed-button" type="submit">
            <i className="fas fa-plus"></i> Добавить
          </button>
        </div>
      </form>
    </div>
  );
}