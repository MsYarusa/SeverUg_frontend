import React, { useState, useEffect } from "react";
import Shedule from "./Schedule";
import GetSchedule from "./GetSchedule";

import "./SchedulePage.css";
import Header from "../Header";
import Footer from "../Footer";

const SchedulePage = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    GetSchedule().then((res) => {
      console.log("in useEffect, res:", res);
      setData(res);
    });
  }, []);

  return (
    <div className="schedule-page">
      <Header firstName={props.firstName} lastName={props.lastName} />
      <Shedule schedule={data}></Shedule>
      <Footer />
    </div>
  );
};

export default SchedulePage;
