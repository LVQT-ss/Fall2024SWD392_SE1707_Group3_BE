import nodemailer from 'nodemailer';
import mailConfig from '../config/mail.config.js'; // Ensure to add the .js extension in ES modules

const transporter = nodemailer.createTransport({
  host: mailConfig.HOST,
  port: mailConfig.PORT,
  secure: mailConfig.PORT === 465, // true for 465, false for other ports
  auth: {
    user: mailConfig.USERNAME,
    pass: mailConfig.PASSWORD,
  },
});

export const sendPasswordEmail = async (to, password, isStaff) => {
  try {
    const info = await transporter.sendMail({
      from: `"${mailConfig.FROM_NAME}" <${mailConfig.FROM_ADDRESS}>`,
      to: to,
      subject: isStaff ? "Your New Staff Account Password" : "Your New Manager Account Password",
      text: `Your ${isStaff ? 'staff' : 'manager'} account has been created. Your temporary password is: ${password}. Please change this password upon your first login.`,
      html: `
        <h1>Welcome to ${mailConfig.FROM_NAME}!</h1>
        <p>Your ${isStaff ? 'staff' : 'manager'} account has been created.</p>
        <p>Your temporary password is: <strong>${password}</strong></p>
        <p>Please change this password upon your first login.</p>
        <p>If you didn't request this account, please contact our support team immediately.</p>
      `,
    });

    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email: ", error);
    return false;
  }
};
