const BuyWindow = ({ cancelHandler, data }) => {
  return (
    <div className="window__container">
      <div className="window">
        <button id="cancel" type="button" onClick={cancelHandler}>
          Отмена
        </button>
      </div>
    </div>
  );
};

export default BuyWindow;
