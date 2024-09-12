# Description
  
  Task scheduler in Node.js that periodically executes tasks like sending reminder emails.

# WorkFlow
 ## Scheduling Emails 
  The project expects a request body with details like recipient email, subject, message, and the desired schedule in cron format.
## Schedule the email
  A cron job is created using the schedule function from node-cron. Inside the job, it attempts to send the email using the transporter and mail options.
## Manage sending and history
  Upon successful email sending, it logs the response and creates a new TaskHistory entry. This entry stores details like email, subject, message, schedule, execution time, and a "Success" status.
  In case of an error while sending, it logs the error and creates a TaskHistory entry with details, including the error message, and sets the status to "Failed."

# Tech Stacks Used
<ul>
  <li>Nodejs</li>
  <li>Reactjs</li>
  <li>Expressjs</li>
  <li>MongoDB</li>
</ul> 

# API Template

## Web Address

[https://task-scheduler-2aay-9l3aa63q2-haripriyaa1224s-projects.vercel.app/](https://task-scheduler-2aay-9l3aa63q2-haripriyaa1224s-projects.vercel.app/)

## Base URL (Backend URL)

[https://taskscheduler-5w49.onrender.com](https://taskscheduler-5w49.onrender.com)

## END POINTS


#### Schedule Mail
POST / [/api/mail/send](https://taskscheduler-5w49.onrender.com/api/mail/send)

#### Get Exectued Tasks
GET / [/api/mail/get](https://estatebackend-yojy.onrender.com/api/mail/get)

