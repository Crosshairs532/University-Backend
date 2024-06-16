import nodemailer from 'nodemailer';
import config from '../config';
export const sendMail = async (email, link) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'samsularefin532@gmail.com',
      pass: 'uxnl inig fobm agdi',
    },
  });

  await transporter.sendMail({
    from: 'samsularefin532@gmail.com', // sender address
    to: `${email}`, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: `${link}`, // plain text body
    html: '<b>Hello world?</b>', // html body
  });
};
