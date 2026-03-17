const fs = require('fs');

const now = new Date();

const timestamp = now.toLocaleString();

const logMessage = `[${timestamp}] const newlog=new Date().toSostring()+ - +
req.method+'-'+req url +\n`;

fs.appendFileSync('log.txt', logMessage);

console.log("Log written successfully");