export const CostInput = ({ onChange, primeCostFrom, primeCostTo }) => {
  return (
    <div className="cost input__container">
      <label className="main-label">Общая стоимость:</label>
      <div className="filter-input half-first-input">
        <label>От</label>
        <input id={primeCostFrom} type="number" onChange={onChange} />
        <p>руб.</p>
      </div>
      <div className="filter-input half-first-input">
        <label>До</label>
        <input id={primeCostTo} type="number" onChange={onChange} />
        <p>руб.</p>
      </div>
    </div>
  );
};

export const TimeInput = ({ onChange, primeTimeFrom, primeTimeTo }) => {
  return (
    <div className="time input__container">
      <label className="main-label">Время в пути:</label>
      <div className="filter-input">
        <label>От</label>
        <input id={primeTimeFrom} type="time" onChange={onChange} />
        <label>До</label>
        <input id={primeTimeTo} type="time" onChange={onChange} />
      </div>
    </div>
  );
};
