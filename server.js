const express = require('express');
const fs = require('fs');
const app = express();

// Middleware to parse JSON
app.use(express.json());

const moment = require('moment-timezone');

// POST endpoint to log user inputs
app.post('/log-input', (req, res) => {
    // Get the current time in the specified timezone (e.g., 'Asia/Kolkata' for IST)
    const timestamp = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'); 
    // Prepare log data with the custom timestamp
    const logData = `${timestamp} - User Input: ${JSON.stringify(req.body)}\n`;
    fs.appendFileSync('logs.txt', logData); // Append logs to a file
    res.status(200).send('Input logged successfully');
});

// POST endpoint to log button clicks
app.post('/log-click', (req, res) => {
    // Get the current time in the specified timezone (e.g., 'Asia/Kolkata' for IST)
    const timestamp = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'); // Adjust timezone as needed

    // Prepare log data with the custom timestamp
    const logData = `${timestamp} - Button Click: ${JSON.stringify(req.body)}\n`;

    // Append the log data to 'logs.txt'
    fs.appendFileSync('logs.txt', logData);

    // Respond back to the client
    res.status(200).send('Click logged successfully');
});

// Serve static files (HTML, CSS, JS)
app.use(express.static('.'));

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
