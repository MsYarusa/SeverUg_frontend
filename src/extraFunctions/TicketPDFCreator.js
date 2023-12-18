import jsPDF from "jspdf";
import QRCode from "qrcode";
import CryptoJS from "crypto-js";

export async function createTicketPDF(ticket) {
  const doc = new jsPDF();

  let code_number = CryptoJS.SHA256(
    `${ticket.id} ${ticket.departure_id} ${ticket.place_number}`
  ).toString(CryptoJS.enc.Hex);

  const ticketData = {
    ticket_id: ticket.id,
    flight_number: ticket.departure_id,
    time_start: ticket.time,
    seat_number: ticket.place_number,
    code_number: code_number,
  };

  const jsonData = JSON.stringify(ticketData);

  code_number = code_number.substring(0, 6);

  const printTicketData = {
    ticket_id: ticket.id,
    flight_number: ticket.departure_id,
    time_start: ticket.time,
    seat_number: ticket.place_number,
    code_number: code_number,
  };

  doc.text("Hello world!", 10, 10);

  const qrDataUrl = await QRCode.toDataURL(jsonData);
  doc.addImage(qrDataUrl, "PNG", 10, 20, 30, 30);

  doc.save("a4.pdf");
  return doc;
}
