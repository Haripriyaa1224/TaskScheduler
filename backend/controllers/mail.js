import nodemailer from 'nodemailer';
import cron from 'node-cron';
import TaskHistory from '../models/task.js';


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
          let historyEntry;
          try {
              const info = await transporter.sendMail(mailOptions);
              console.log('Reminder Email sent: ' + info.response);

              
              historyEntry = new TaskHistory({
                email,
                subject,
                message,
                schedule,
                executionTime: new Date(),
                status: 'Success'
              });
await historyEntry.save();
              
          } catch (error) {
              console.error('Error sending email:', error);
              // Log error to MongoDB
        historyEntry = new TaskHistory({
          email,
          subject,
          message,
          schedule,
          executionTime: new Date(),
          status: 'Failed',
          error: error.message
        });
          }
        await historyEntry.save();
      });
      // Start the after scedule
      job.start();
      
      res.status(200).send('Reminder Email Scheduled Successfully');
      }
    catch (error) {
      res.status(501).send(error.message);
    }
    console.log(req.body)

}


export const getHistory = async (req, res) => {
  try {
    
    const history = await TaskHistory.find();

    
    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching task history:', error);
    
   
    res.status(500).json({ message: 'Failed to retrieve task history', error: error.message });
  }
}