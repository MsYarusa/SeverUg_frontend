import React from "react";
import LinkButton from "../../cards/LinkButton";
import { admin_data } from "./LinkButtonData/LinkButtonData";
import "./GridLayout.css";

const GridLayout = ({ type }) => {
  if (type === "admin") {
    return (
      <ul className="grid-layout">
        {admin_data?.map((button) => (
          <div key={button.text} className="link-button">
            <LinkButton
              to={button.to}
              className="container"
              style={{ textDecoration: "none" }}
            >
              <img src={button.img} />
              <p>{button.text}</p>
            </LinkButton>
          </div>
        ))}
      </ul>
    );
  }
  return <></>;
};

export default GridLayout;
