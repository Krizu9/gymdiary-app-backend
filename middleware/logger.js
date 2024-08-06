const fs = require('fs');

const logger = (req, res, next) => {
    try {
        const { method, url, body, headers } = req;
        const timestamp = new Date().toISOString();
        const logData = `---------------------------------------------------------------------------------------------------\n[Timestamp: ${timestamp}]\nMethod: ${method}\nURL:${url}\nRequest Body: ${JSON.stringify(body)}\nHeaders: ${JSON.stringify(headers)}\n`;

        fs.appendFile('./log/log.txt', logData, (err) => {
            if (err) {
                console.error('Error writing to log file:', err, 'timestamp:', timestamp, 'method:', method, 'url:', url, 'body:', body, 'headers:', headers);
            }
        });
    } catch (error) {
        console.error(error);
    }
    next();
};

module.exports = logger;