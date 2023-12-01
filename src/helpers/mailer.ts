import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      console.log("Verify email path");
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "8fa23bc12da020",
        pass: "b50493ff468584",
      },
    });

    const mailOptions = {
      from: "rk.metalhead@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html:
        emailType === "VERIFY"
          ? `<p>Click <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">here</a> to verify your email or copy and paste the link in your browser.</p>`
          : `<p>Click <a href="${process.env.DOMAIN}/resetPassword?token=${hashedToken}">here</a> to reset your password or copy and paste the link in your browser.</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    console.log(mailResponse);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
