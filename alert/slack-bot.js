const nodemailer = require('nodemailer'); // Import Nodemailer

// Configure Nodemailer
const emailTransporter = nodemailer.createTransport({
  service: 'Gmail', // You can use another email service here
  auth: {
    user: 'awabil.test1@gmail.com', // Your email username
    pass: 'rbhw hrhk psvc yhxc', // Your email password
  },
});

// Function to send email alerts
async function sendEmailAlert(subject, message) {
  try {
    const mailOptions = {
      from: 'awabil.test1@gmail.com', // Sender's email address
      to: 'kodemindset@gmail.com', // Recipient's email address
      subject: subject,
      text: message,
    };

    await emailTransporter.sendMail(mailOptions);

    console.log(`Email alert sent successfully: ${subject}`);
  } catch (error) {
    console.error(`Error sending email alert: ${error.message}`);
  }
}

module.exports = {
  sendEmailAlert, // Export the email alert function only
};
