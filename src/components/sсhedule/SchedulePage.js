import React, { useEffect } from "react";
import Shedule from "./Schedule";
import { getSchedule } from "./GetSchedule";
import { useDispatch, useSelector } from "react-redux";

import "./SchedulePage.css";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const SchedulePage = () => {
  const dispatch = useDispatch();
  const schedule = useSelector((state) => state.schedule.schedule);

  useEffect(() => {
    dispatch(getSchedule());
  }, [dispatch]);

  return (
    <div className="schedule-page">
      <Header />
      <Shedule schedule={schedule}></Shedule>
      <Footer />
    </div>
  );
};

export default SchedulePage;
