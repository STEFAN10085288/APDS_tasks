const https = require('https');
const app = require('./app');
const fs =require('fs');

const port = 3000


const server = https.createServer(
    {
        key: fs.readFileSync('keys/privatekey.pem'),
        cert: fs.readFileSync('keys/certificate.pem')
    },app);

    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });