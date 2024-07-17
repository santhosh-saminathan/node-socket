const nodemailer = require("nodemailer");

// here please replace your email and smtp setup password. for task 4

let email = "";
let password = "";

let _sendEmail = async (toEmail, task) => {
  console.log("email inpts", toEmail, task);
  // Create a transporter
  let transporter = nodemailer.createTransport({
    service: "gmail", // e.g., 'gmail'
    auth: {
      user: email, // Your email address
      pass: password, // Your email password or app-specific password
    },
  });

  // Set up email data
  let mailOptions = {
    from: email,
    to: toEmail,
    subject: "TO DO Task Update",
    text: "Your task " + task + "is going to arrive soon, please do it.",
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
};

module.exports = {
  sendEmail: _sendEmail,
};
