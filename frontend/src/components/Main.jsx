import { useEffect, useState } from "react";
import { fetchAllTariffs, addTariff } from "../requests";

import TariffCard from "./ui/TariffCard";
import AddTariff from "./forms/AddTariff";
import AddServiceType from "./forms/AddServiceType"; 

export default function Main() {
  const [data, setData] = useState([]);
  const [shown, setShown] = useState(false);
  const [shownServiceType, setShownServiceType] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllTariffs()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке тарифов:", error);
        setLoading(false);
      });
  }, []);



  return (
    <>
      <div className="main-block-menu">
        {!shown && (
          <button
            className="filed-button"
            onClick={() => {
              setShown(true);
              window.scrollTo(0, 0);
            }}
          >
            <i className="fas fa-plus-circle"></i>
            Добавить тариф
          </button>
        )}
        {!shownServiceType && (
          <button
            className="filed-button"
            onClick={() => {
              setShownServiceType(true);
              window.scrollTo(0, 0);
            }}
          >
            <i className="fas fa-layer-group"></i>
            Добавить тип услуги
          </button>
        )}
      </div>

      <main className="main-block">
        {(shown || shownServiceType) && (
          <div className="main-block-form">
            {shown && <AddTariff setShown={setShown} requestFunction={addTariff} />}
            {shownServiceType && (
              <AddServiceType setShown={setShownServiceType} />
            )}
          </div>
        )}



        <div className="main-block-list">
          {loading ? (
            <div className="loading">
              <i className="fas fa-spinner fa-spin"></i>
              Загрузка тарифов...
            </div>
          ) : data.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-inbox"></i>
              <h3>Тарифы не найдены</h3>
              <p>Начните с добавления первого тарифа</p>
              <button
                className="filed-button"
                onClick={() => setShown(true)}
                style={{ marginTop: '1.5rem' }}
              >
                <i className="fas fa-plus"></i>
                Создать первый тариф
              </button>
            </div>
          ) : (
            data.map((element, index) => (
              <TariffCard key={element.tariff_id || index} data={element} allTariffs={data} />
            ))
          )}
        </div>
      </main>
    </>
  );
}