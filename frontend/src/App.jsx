import React, { useState } from 'react';
import axios from 'axios';
import TaskHistoryLogs from './Pages/TaskHistoryLogs';

const App = () => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
    schedule: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the form data to the backend
      const response = await axios.post('https://taskscheduler-5w49.onrender.com/api/mail/send', formData);
      alert(response.data);
    } catch (error) {
      console.error('Error sending form data:', error);
      alert('Error scheduling the email.');
    }
  };

  return (
    <div style={{ margin: '50px auto', maxWidth: '500px' }}>
      <h2>Schedule Reminder Email</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>To Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Subject: </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Message: </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Schedule (Cron Format): </label>
          <input
            type="text"
            name="schedule"
            placeholder="* * * * *"
            value={formData.schedule}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Schedule Email
        </button>
      </form>
      <TaskHistoryLogs />
    </div>
  );
};

export default App;
