export const CostInput = ({ onChange }) => {
  return (
    <div className="cost">
      <label className="main-label">Общая стоимость:</label>
      <div>
        <label>От</label>
        <input id="min-cost" type="number" onChange={onChange} />
        <p>руб.</p>
      </div>
      <div>
        <label>До</label>
        <input id="max-cost" type="number" onChange={onChange} />
        <p>руб.</p>
      </div>
    </div>
  );
};

export const TimeInput = ({ onChange }) => {
  return (
    <div className="time">
      <label className="main-label">Время в пути:</label>
      <div>
        <label>От</label>
        <input id="min-time" type="time" onChange={onChange} />
        <label>До</label>
        <input id="max-time" type="time" onChange={onChange} />
      </div>
    </div>
  );
};
