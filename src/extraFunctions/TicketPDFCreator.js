import jsPDF from "jspdf";
import QRCode from "qrcode";
import CryptoJS from "crypto-js";

export async function createTicketPDF(ticket) {
  const doc = new jsPDF("p", "mm", [165, 50]);

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

  const codeImg = createImageFromTextArray([
    `    <БИЛЕТ НА РЕЙС>`,
    `№ РЕЙСА: ${ticket.trip_id}`,
    `№ БИЛЕТА: ${ticket.id}`,
    `№ ПОЕЗДКИ: ${ticket.departure_id}`,
    `# МЕСТА: ${ticket.place_number}`,
    `КОД БИЛЕТА: ${code_number}`,
  ]);
  doc.addImage(codeImg, "PNG", 5, 0, 100, 31.25);
  const qrDataUrl = await QRCode.toDataURL(jsonData);
  doc.addImage(qrDataUrl, "PNG", 5, 33, 40, 40);
  const buyerDateImg = createImageFromTextArray([
    `ПУНКТ ОТПРАВЛЕНИЯ:`,
    `${ticket.departure_point}`,
    `ПУНКТ ПРИБЫТИЯ:`,
    `${ticket.place_of_arrival}`,
    `ДАТА ОТПРАВЛЕНИЯ`,
    `${new Date(ticket.date).toISOString().split("T")[0]}`,
    `ВРЕМЯ ОТПРАВЛЕНИЯ`,
    `${ticket.time}`,
    `ФАМИЛИЯ`,
    `${ticket.last_name}`,
    `ИМЯ`,
    `${ticket.first_name}`,
    `ОТЧЕСТВО`,
    `${ticket.surname}`,
  ]);
  doc.addImage(buyerDateImg, "PNG", 5, 73, 100, 87.5);
  doc.save(`билет№${ticket.id}.pdf`);
  return doc;
}

function createImageFromTextArray(textArray) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Устанавливаем размер холста
  canvas.width = 800;
  canvas.height = 50 * textArray.length + 1;

  // Отрисовываем текст в столбик
  context.font = "25px Arial";
  textArray.forEach((text, index) => {
    context.fillText(text, 20, 50 * (index + 1));
  });

  // Возвращаем изображение в виде URL
  return canvas.toDataURL();
}
