import nodemailer from "nodemailer";
import { config } from "./config";

export async function mail(html: string, to: string, subject: string) {
  const transporter = nodemailer.createTransport(config.SMTP_URL, {});
  await transporter.sendMail({
    from: "<no-reply@ymtsindia.com>",
    to,
    subject,
    html,
  });
}
