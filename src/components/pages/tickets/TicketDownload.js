import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createTicketPDF } from "../../../extraFunctions/TicketPDFCreator";

const TicketDownload = () => {
  const tickets = useSelector((state) => state.departures.tickets);

  useEffect(() => {
    for (let ticket of tickets) {
      createTicketPDF(ticket);
    }
  }, [tickets]);

  return <div className="ticket-links__container">Билеты оформлены</div>;
};

export default TicketDownload;
