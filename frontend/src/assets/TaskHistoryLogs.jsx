import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskHistoryLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch logs from the API
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('https://taskscheduler-5w49.onrender.com/api/mail/get');
        setLogs(response.data);
        console.log(response.data);
      } catch (err) {
        setError('Failed to load logs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Task Execution Logs</h2>
      {logs.length === 0 ? (
        <p>No logs available</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Schedule</th>
              <th>Execution Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td>{log.email}</td>
                <td>{log.subject}</td>
                <td>{log.message}</td>
                <td>{log.schedule}</td>
                <td>{new Date(log.executionTime).toLocaleString()}</td>
                <td>{log.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskHistoryLogs;
