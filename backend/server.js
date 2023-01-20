const express = require('express');
const server = express();

const PORT = process.env.port || 8000;
server.listen(PORT, () => {
  console.log(`SERVER IS LISTENING AT PORT ${PORT}...`);
});
