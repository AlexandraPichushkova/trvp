import React, { useState } from 'react';
import { addTariff, updateTariff } from '../../requests';

export default function AddTariff({ setShown, initialData = {} }) {
  const { tariff_id, tariff_code, tariff_name } = initialData;

  const [newData, setNewData] = useState({
    tariff_code: tariff_code || '',
    tariff_name: tariff_name || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (tariff_id) {
        await updateTariff(tariff_id, { tariff_name: newData.tariff_name });
      } else {
        await addTariff(newData);
      }
      setShown(false);
      window.location.reload();
    } catch (error) {
      alert('Ошибка при сохранении тарифа');
      console.error(error);
    }
  };

  return (
    <div className="form-block">
      <h2>
        <i className="fas fa-bolt"></i>
        {tariff_id ? 'Редактирование тарифа' : 'Добавление тарифа'}
      </h2>
      <form onSubmit={handleSubmit}>
        {!tariff_id && (
          <div className="form-input-block">
            <label><i className="fas fa-hashtag"></i> Код тарифа (неизменяемое поле):</label>
            <input
              name="tariff_code"
              type="text"
              value={newData.tariff_code}
              onChange={handleChange}
              required
              placeholder="Например: BASE"
            />
          </div>
        )}
        <div className="form-input-block">
          <label><i className="fas fa-signature"></i> Название тарифа:</label>
          <input
            name="tariff_name"
            type="text"
            value={newData.tariff_name}
            onChange={handleChange}
            required
            placeholder="Например: Базовый тариф"
          />
        </div>

        <div className="buttons-block">
          <button className="grey-button" type="button" onClick={() => setShown(false)}>
            <i className="fas fa-times"></i> Отменить
          </button>
          <button className="filed-button" type="submit">
            <i className="fas fa-check"></i> {tariff_id ? 'Сохранить' : 'Добавить'}
          </button>
        </div>
      </form>
    </div>
  );
}