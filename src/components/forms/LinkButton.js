import React from "react";
import { Link } from "react-router-dom";

const LinkButton = ({ children, to, ...props }) => {
  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
};

export default LinkButton;
