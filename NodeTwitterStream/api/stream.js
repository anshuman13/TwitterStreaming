require('dotenv').config();

// Imports
const express = require('express');
const needle = require('needle');
const router = express.Router();
const app = require('../app');

  
module.exports = router;



const options = {
  timeout: 20000
}

function streamConnect() {

  const stream = needle.get(streamURL, {
    headers: { 
      Authorization: `Bearer ${token}`
    }
  }, options);

  stream.on('data', data => {
    try {
      const json = JSON.parse(data);
      console.log(json);
    } catch (e) {
      // Keep alive signal received. Do nothing.
    }
  }).on('error', error => {
    if (error.code === 'ETIMEDOUT') {
      stream.emit('timeout');
    }
  });

  return stream;
}
 
(async () => {

  // Listen to the stream.
  // This reconnection logic will attempt to reconnect when a disconnection is detected.
  // To avoid rate limites, this logic implements exponential backoff, so the wait time
  // will increase if the client cannot reconnect to the stream.
  
  const sampledStream = streamConnect()
  let timeout = 0;
  sampledStream.on('timeout', () => {
    // Reconnect on error
    console.warn('A connection error occurred. Reconnecting…');
    setTimeout(() => {
      timeout++;
      streamConnect();
    }, 2 ** timeout);
    streamConnect();
  })

})();
