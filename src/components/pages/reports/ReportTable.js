import { TYPES_DICT } from "./reportCONST/ReportHeaders";

import ReportConfigs from "./ReportConfigs";

const ReportTable = () => {
  return (
    <div className="objects-list">
      <div className="object-search">
        <button onClick={showFilterHandler} className="show-filter-button">
          Получить отчет
        </button>
        <button onClick={showFilterHandler} className="show-filter-button">
          Скачать отчет
        </button>
      </div>
      <ReportConfigs />
      <Report header={TYPES_DICT[type]} data={data} />
    </div>
  );
};

export default ReportTable;
