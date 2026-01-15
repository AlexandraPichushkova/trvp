import { useState, useEffect } from "react";
import { deleteService, moveService, fetchAllTariffs } from "../../requests";

export default function ServiceCard({ data, parentTariffId }) {
  const { service_id, service_code, service_type_name, param_value, param_unit } = data;

  const [moveMode, setMoveMode] = useState(false);
  const [newData, setNewData] = useState({ new_tariff_id: "" });
  const [allTariffs, setAllTariffs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadTariffs = async () => {
      setIsLoading(true);
      try {
        const tariffs = await fetchAllTariffs();
        setAllTariffs(tariffs || []);
      } catch (error) {
        console.error("Ошибка при загрузке тарифов:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (moveMode) {
      loadTariffs();
    }
  }, [moveMode]);

  const handleDelete = async () => {
    if (window.confirm(`Вы уверены, что хотите удалить услугу "${service_code}"?`)) {
      try {
        await deleteService(service_id);
        window.location.reload();
      } catch (err) {
        alert("Ошибка при удалении услуги");
        console.error(err);
      }
    }
  };

  const handleChange = (e) => {
    setNewData({ new_tariff_id: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newData.new_tariff_id) {
      alert("Выберите новый тариф перед переносом.");
      return;
    }
    try {
      await moveService(service_id, { new_tariff_id: newData.new_tariff_id });
      setMoveMode(false);
      window.location.reload();
    } catch (err) {
      alert("Ошибка при переносе услуги. Возможно, в целевом тарифе уже есть услуга такого типа.");
      console.error(err);
    }
  };

  return (
    <div className="inner-card-block">
      <div className="inner-card-block-name">
        <div>
          <i className="fas fa-wifi" style={{ color: '#4361ee' }}></i>
          <span style={{ fontWeight: '700', color: 'var(--dark-color)' }}>
            {service_code}
          </span>
          <span style={{ color: 'var(--gray-dark)', margin: '0 0.5rem' }}>—</span>
          <span style={{ color: 'var(--primary-color)', fontWeight: '600' }}>
            {service_type_name}
          </span>
          <span style={{
            marginLeft: '0.5rem',
            background: 'rgba(67, 97, 238, 0.1)',
            color: 'var(--primary-color)',
            padding: '0.2rem 0.6rem',
            borderRadius: '6px',
            fontSize: '0.9rem',
            fontWeight: '700'
          }}>
            {param_value} {param_unit}
          </span>
        </div>
        <div className="inner-card-block-buttons">
          {!moveMode && (
            <i
              className="fas fa-exchange-alt"
              onClick={() => setMoveMode(true)}
              title="Перенести услугу в другой тариф"
            ></i>
          )}
          <i
            className="fas fa-trash-alt"
            onClick={handleDelete}
            title="Удалить услугу"
          ></i>
        </div>
      </div>

      {moveMode && (
        <form onSubmit={handleSubmit} className="form-block" style={{
          marginTop: '1rem',
          padding: '1.2rem',
          maxWidth: '100%'
        }}>
          <div className="form-input-block">
            <label><i className="fas fa-arrows-alt-h"></i> Перенести в тариф:</label>
            {isLoading ? (
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <i className="fas fa-spinner fa-spin"></i> Загрузка тарифов...
              </div>
            ) : (
              <select
                value={newData.new_tariff_id}
                onChange={handleChange}
                required
                style={{ width: '100%' }}
              >
                <option value="" disabled>
                  — Выберите тариф —
                </option>
                {allTariffs
                  .filter((t) => t.tariff_id !== parentTariffId)
                  .map((t) => (
                    <option key={t.tariff_id} value={t.tariff_id}>
                      {t.tariff_name} ({t.tariff_code})
                    </option>
                  ))}
              </select>
            )}
          </div>
          <div className="buttons-block" style={{ marginTop: '1rem', paddingTop: '1rem' }}>
            <button
              className="grey-button"
              type="button"
              onClick={() => setMoveMode(false)}
              style={{ flex: 1 }}
            >
              <i className="fas fa-times"></i> Отменить
            </button>
            <button className="filed-button" type="submit" style={{ flex: 1 }}>
              <i className="fas fa-check"></i> Перенести
            </button>
          </div>
        </form>
      )}
    </div>
  );
}