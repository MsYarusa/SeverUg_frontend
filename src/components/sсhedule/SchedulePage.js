import React, { useState, useEffect } from "react";
import Shedule from "./Schedule";
import GetSchedule from "./GetSchedule";

import "./SchedulePage.css";

const SchedulePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    GetSchedule().then((res) => {
      console.log("in useEffect, res:", res);
      setData(res);
    });
  }, []);

  return (
    <div className="schedule-page">
      {console.log("in return, data:", data)}
      <Shedule schedule={data}></Shedule>
    </div>
  );
};

export default SchedulePage;
