import { Link } from "react-router-dom";
import {
  admin_data,
  manager_data,
  director_data,
} from "./buttonData/ButtonData";

import "./homeStyles/GridLayout.css";

const GridLayout = ({ role }) => {
  let data = [];
  switch (role) {
    case "admin":
      data = admin_data;
      break;
    case "manager":
      data = manager_data;
      break;
    case "director":
      data = director_data;
      break;
  }

  return (
    <ul className="grid-layout">
      {data?.map((button) => (
        <div key={button.text} className="link-button">
          <Link
            to={button.to}
            className="container"
            style={{ textDecoration: "none" }}
          >
            <img src={button.img} />
            <p>{button.text}</p>
          </Link>
        </div>
      ))}
    </ul>
  );
};

export default GridLayout;
