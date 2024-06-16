import nodemailer from 'nodemailer';
import config from '../config';
export const sendMail = async (email: string, link: string) => {
  console.log({ email, link });
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'samsularefin533@gmail.com',
      pass: 'ikoi qmcf csal molz',
    },
    debug: true,
  });

  await transporter.sendMail({
    from: 'samsularefin533@gmail.com',
    to: `${email}`,
    subject: 'Reset Your password',
    text: `${link}`,
    html: `<p>Click the following link to reset your password: <a href="${link}">${link}</a></p>`, // Ensure html content is correctly defined
  });
};

// https://localhost:2000?id?=A-0001&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTg1NDA2NzcsImV4cCI6MTcxOTQwNDY3N30.pf2QCGmhcaUF1up5BuHqarhDhWGK9fwmn1iREwqQzak
