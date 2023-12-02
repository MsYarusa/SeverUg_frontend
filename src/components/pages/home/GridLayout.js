import { Link } from "react-router-dom";
import { admin_data } from "./buttonData/ButtonData";

import "./homeStyles/GridLayout.css";

const GridLayout = ({ type }) => {
  if (type === "admin") {
    return (
      <ul className="grid-layout">
        {admin_data?.map((button) => (
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
  }
  return <></>;
};

export default GridLayout;
