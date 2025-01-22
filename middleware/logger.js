const fs = require('fs');
const path = require('path');

const logger = (req, res, next) => {
  const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
  fs.appendFileSync(path.join(__dirname, '../logs/requests.log'), log, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
  next();
};

module.exports = logger;