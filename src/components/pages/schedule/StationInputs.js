import cancelImg from "../../cards/buttonImgs/close.svg";

export const StationSelector = ({
  stations,
  index,
  deleteHandler,
  defaultValue,
  onChange,
}) => {
  return (
    <div id={"S " + index} className="station">
      <p>{index + 1 + "."}</p>
      <select
        id={"s " + index}
        disabled={stations ? false : true}
        defaultValue={JSON.stringify(defaultValue)}
        onChange={onChange}
      >
        <option disabled value={JSON.stringify(defaultValue)}>
          {defaultValue}
        </option>
        {stations?.map((station) => (
          <option
            key={station.name + index.toString()}
            value={JSON.stringify(station)}
          >
            {station.name}
          </option>
        ))}
      </select>
      {index !== 0 && deleteHandler && (
        <button
          type="button"
          id={index.toString()}
          className="cancelStation"
          onClick={deleteHandler}
        >
          <img src={cancelImg} id={index.toString()} />
        </button>
      )}
    </div>
  );
};

export const CostTimeInputs = ({ index, defaultTime, defaultCost }) => {
  return (
    <>
      <div className="label-input" key={"time " + index}>
        <label>Время в пути:</label>
        <input
          id={"time " + index}
          disabled={defaultTime !== ""}
          type={defaultTime === "" ? "time" : "text"}
          defaultValue={defaultTime}
        />
      </div>
      <div className="label-input" key={"cost " + index}>
        <label>Стоимость за проезд:</label>
        <input
          id={"cost " + index}
          disabled={defaultCost !== ""}
          type="number"
          defaultValue={defaultCost}
        />
        <p>руб.</p>
      </div>
    </>
  );
};
