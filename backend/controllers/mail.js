import nodemailer from 'nodemailer';


export const send = async (req, res) =>{

    const { email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST, // Replace with your provider's SMTP server
        port: parseInt(process.env.SMTP_PORT, 10),
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      });

      const mailOptions = {
        from: process.env.SMTP_USER, // Replace with your email address
        to: email, // Replace with the recipient's email address
        subject: subject, // Replace with your desired subject
        text: message, // Plain text content
        
      };
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email Sent Successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }

}
