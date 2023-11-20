import React, { useEffect } from "react";
import Shedule from "./Schedule";
import { getSchedule } from "./GetSchedule";
import { useDispatch, useSelector } from "react-redux";

import "./SchedulePage.css";

const SchedulePage = () => {
  const dispatch = useDispatch();
  const schedule = useSelector((state) => state.schedule.schedule);

  useEffect(() => {
    dispatch(getSchedule());
  }, [dispatch]);

  return (
    <div className="schedule-page">
      <Shedule schedule={schedule}></Shedule>
    </div>
  );
};

export default SchedulePage;
