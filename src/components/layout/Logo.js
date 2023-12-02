import logo from "./layoutImgs/logoImg.svg";
import "./layoutStyles/Logo.css";

const Logo = () => {
  return (
    <div className="logo-block">
      <img src={logo} alt={"Лого"} />
      <p>
        Автотранспортное предприятие <br />
        "Север-Юг"
      </p>
    </div>
  );
};

export default Logo;
