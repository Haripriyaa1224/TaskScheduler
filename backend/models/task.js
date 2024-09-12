import mongoose from "mongoose";

const taskHistorySchema = new mongoose.Schema({
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    schedule: { type: String, required: true },
    executionTime: { type: Date, default: Date.now },
    status: { type: String, default: 'Success' }, // You can track if the email was successfully sent
    error: { type: String, default: '' } // Store error message if any
  });
  
  const TaskHistory = mongoose.model('TaskHistory', taskHistorySchema);
  
  export default TaskHistory;