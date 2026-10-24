import QRCode from 'qrcode';
import puppeteer from 'puppeteer';

// Generate QR code for a booking
export const generateQRCode = async (bookingData) => {
  const qrData = JSON.stringify(bookingData);
  return await QRCode.toDataURL(qrData);
};

// Generate PDF ticket for a booking
export const generateTicketPDF = async (booking) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Generate QR code for the booking
  const qrCode = await generateQRCode(booking);
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Event Ticket - ${booking.eventId}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          background: #f5f5f5;
        }
        .ticket {
          background: white;
          padding: 30px;
          border-radius: 10px;
          max-width: 600px;
          margin: 0 auto;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .event-name {
          font-size: 28px;
          color: #333;
          margin-bottom: 10px;
        }
        .ticket-id {
          font-size: 14px;
          color: #666;
          margin-bottom: 5px;
        }
        .qr-section {
          text-align: center;
          margin: 30px 0;
        }
        .qr-code {
          width: 150px;
          height: 150px;
        }
        .details {
          margin-top: 30px;
          border-top: 1px solid #eee;
          padding-top: 20px;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .label {
          font-weight: bold;
          color: #555;
        }
        .value {
          color: #333;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          font-size: 12px;
          color: #999;
        }
      </style>
    </head>
    <body>
      <div class="ticket">
        <div class="header">
          <div class="event-name">Event Ticket</div>
          <div class="ticket-id">Ticket ID: ${booking._id}</div>
          <div class="ticket-id">Booking ID: ${booking.bookingId}</div>
        </div>
        
        <div class="qr-section">
          <img src="${qrCode}" class="qr-code" alt="QR Code">
          <p>Scan for fast check-in</p>
        </div>
        
        <div class="details">
          <div class="detail-row">
            <span class="label">Event:</span>
            <span class="value">${booking.eventId}</span>
          </div>
          <div class="detail-row">
            <span class="label">Number of Tickets:</span>
            <span class="value">${booking.numberOfTickets}</span>
          </div>
          <div class="detail-row">
            <span class="label">Total Amount:</span>
            <span class="value">₹${booking.totalAmount}</span>
          </div>
          <div class="detail-row">
            <span class="label">Status:</span>
            <span class="value">${booking.status}</span>
          </div>
          <div class="detail-row">
            <span class="label">Booked On:</span>
            <span class="value">${new Date(booking.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div class="footer">
          <p>This is an electronic ticket. Please save it for your records.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  await page.setContent(html);
  const pdf = await page.pdf({ format: 'A4' });
  await browser.close();
  
  return pdf;
};

export default { generateQRCode, generateTicketPDF };