import { useState } from "react";
import { deleteTariff } from "../../requests";
import AddTariff from "../forms/AddTariff";
import AddService from "../forms/AddService";
import ServiceCard from "./ServiceCard";

export default function TariffCard({ data, allTariffs }) {
  const { tariff_id, tariff_code, tariff_name, services = [] } = data;

  const [editMode, setEditMode] = useState(false);
  const [addServiceMode, setAddServiceMode] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Вы уверены, что хотите удалить тариф "${tariff_name}"?`)) {
      try {
        await deleteTariff(tariff_id);
        window.location.reload();
      } catch (err) {
        alert("Ошибка при удалении тарифа");
        console.error(err);
      }
    }
  };

  return (
    <div className="card-block">
      {editMode ? (
        <AddTariff setShown={setEditMode} initialData={data} />
      ) : (
        <>
          <div className="card-block-title">
            <h2 className="card-block-title-name">
              <i className="fas fa-bolt"></i>
              {tariff_name}
              <span style={{
                opacity: 0.9,
                fontSize: '0.95rem',
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontWeight: '500'
              }}>
                {tariff_code}
              </span>
            </h2>
            <div>
              <i
                className="fas fa-edit card-block-title-edit-button"
                onClick={() => setEditMode(true)}
                title="Редактировать тариф"
              ></i>
              <i
                className="fas fa-trash-alt card-block-title-delete-button"
                onClick={handleDelete}
                title="Удалить тариф"
                style={{ marginLeft: '0.75rem' }}
              ></i>
            </div>
          </div>

          <div className="card-block-content">
            <div className="card-block-subitems">
              <h3>
                <i className="fas fa-list"></i>
                Услуги в тарифе:
                <span style={{
                  marginLeft: '0.5rem',
                  fontSize: '0.9rem',
                  background: 'rgba(67, 97, 238, 0.1)',
                  color: 'var(--primary-color)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '12px',
                  fontWeight: '600'
                }}>
                  {services.length} шт.
                </span>
              </h3>

              {services.length === 0 ? (
                <div className="empty-state" style={{
                  padding: '1.5rem',
                  margin: '0.5rem 0',
                  minHeight: '120px'
                }}>
                  <i className="fas fa-ban"></i>
                  <p style={{ marginTop: '0.5rem' }}>Нет добавленных услуг</p>
                </div>
              ) : (
                <div className="card-block-subitems-list">
                  {services.slice(0, 3).map((srv) => (
                    <ServiceCard
                      key={srv.service_id}
                      data={srv}
                      parentTariffId={tariff_id}
                      allTariffs={allTariffs}
                    />
                  ))}

                  {services.length > 3 && (
                    <div style={{
                      textAlign: 'center',
                      padding: '0.8rem',
                      color: 'var(--gray)',
                      fontStyle: 'italic',
                      fontSize: '0.95rem',
                      background: 'rgba(0, 0, 0, 0.02)',
                      borderRadius: '8px',
                      border: '1px dashed var(--gray-light)',
                      marginTop: '0.5rem'
                    }}>
                      <i className="fas fa-ellipsis-h"></i> и еще {services.length - 3} услуг
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="card-block-footer">
            <div>
              <i className="fas fa-wifi"></i>
              Услуг: {services.length}
            </div>
            <div>
              {addServiceMode ? (
                <AddService
                  setShown={setAddServiceMode}
                  parentTariffId={tariff_id}
                />
              ) : (
                <button
                  className="unfiled-button"
                  onClick={() => setAddServiceMode(true)}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  <i className="fas fa-plus"></i>
                  Добавить услугу
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}