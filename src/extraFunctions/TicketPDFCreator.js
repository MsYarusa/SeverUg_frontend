import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import CryptoJS from "crypto-js";

function createTicketPDF(ticket_id, flight_number, time_start, seat_number) {

    let code_number = CryptoJS.SHA256(`${ticket_id} ${flight_number} ${seat_number}`).toString(CryptoJS.enc.Hex)

    const ticketData = {
        ticket_id,
        flight_number,
        time_start,
        seat_number,
        code_number,
    };

    const jsonData = JSON.stringify(ticketData);

    code_number = code_number.substring(0,6)

    const printTicketData = {
        ticket_id,
        flight_number,
        time_start,
        seat_number,
        code_number,
    }

    QRCode.toDataURL(jsonData, (err, qrCodeData) => {
        const pdf = new jsPDF();
        pdf.text(20, 20, printTicketData);
        pdf.addImage(qrCodeData, 'JPEG', 15, 40, 30, 30);
        const pdfOutput = pdf.output('bloburl');
        return pdfOutput;
    });
}