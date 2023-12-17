import phone from "./layoutImgs/phoneImg.svg";
import email from "./layoutImgs/emailImg.svg";
import "./layoutStyles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div id="contacts">
        <img src={email} alt="email" />
        <p id="email">severug@mail.ru</p>
      </div>
      <p id="info">@ 2020-2023 Автотранспортное предприятие ООО "Север-Юг"</p>
    </footer>
  );
};

export default Footer;
