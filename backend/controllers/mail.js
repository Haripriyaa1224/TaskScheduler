import nodemailer from 'nodemailer';
import cron from 'node-cron';


export const send = async (req, res) =>{

  const { email, subject, message, schedule } = req.body;

  // Validate schedule
  if (!schedule || !cron.validate(schedule)) {
    return res.status(400).send('Invalid cron schedule format');
  }

    const transporter = nodemailer.createTransport({
        host:process.env.SMTP_HOST, // Replace with your provider's SMTP server
        port: 465,
        secure: true, // true for 465, false for other ports
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

      // Schedule the email using cron

      try{
        const job = cron.schedule(schedule, async () => {
          try {
              const info = await transporter.sendMail(mailOptions);
              console.log('Reminder Email sent: ' + info.response);
          } catch (error) {
              console.error('Error sending email:', error);
          }
      });
      // Start the job immediately
      job.start();
  
      res.status(200).send('Reminder Email Scheduled Successfully');
      }
    catch (error) {
      res.status(501).send(error.message);
    }
    console.log(req.body)

}
