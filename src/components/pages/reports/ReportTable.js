const ReportTable = () => {
  return (
    <div className="objects-list">
      <div className="object-search">
        <div className="departures-date__container">
          <input
            type="date"
            id={"date-selector"}
            onChange={selectDateHandler}
          />
        </div>
        <SearchFromTo search={searchHandler} />
        <button onClick={showFilterHandler} className="show-filter-button">
          <img src={filter} />
        </button>
      </div>
      <DeparturesFilter
        onFilter={filterHandler}
        isSmall={true}
        isVisible={showFilter}
      />
      {list?.map((item) => (
        <div
          key={item.id + " " + (item.trip ? item.trip.id : "")}
          className="items__container"
        >
          {dateSelected ? (
            <>{item.trip && <DepartureItem data={item} onBuy={buyHandler} />}</>
          ) : (
            <>{!item.trip && <ScheduleItem data={item} />}</>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReportTable;
