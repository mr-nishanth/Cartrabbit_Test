const nodemailer = require('nodemailer');
const sendEmail = async (options) => {
    const transport = {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    };

    const transporter = nodemailer.createTransport(transport);
    const message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    await transporter.sendMail(message);
};

module.exports = sendEmail;

/**
 * try {
    sendEmail({
      email: user.email,
      subject: "Bike Service Status",
      message,
    });
    res
      .status(200)
      .json({ success: true, message: `Email sent to: ${user.email}` });
  } catch (error) { 
    return next(new ErrorHandler(error.message, 500));
  }
 */
