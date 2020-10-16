require('dotenv').config()

const express = require('express');
const trend = require('./api/trends');
const cors = require('cors');
const request = require("request");
const needle = require('needle');


// Express
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));

app.use('/trends', trend);

app.use(function serverErrorHandler(err, req, res, next){
  res.status(500).json({
    error: err
  });
});

//app.listen(port, () => console.log(`Twitter Server app listening on port ${port}!`))

// Sockets
const socketIo = require("socket.io");
const http = require("http");
const e = require('express');
const { cpuUsage } = require('process');
const { type } = require('os');


// Token and Url
const token = process.env.BEARER_TOKEN;  
const streamURL = 'https://api.twitter.com/2/tweets/sample/stream?expansions=author_id&user.fields=profile_image_url&tweet.fields=created_at';
let timeout = 0;


const server = http.createServer(app);
const io = socketIo(server);
server.listen(port, () => console.log(`Listening on port ${port}`));

const errorMessage = {
    title: "Please Wait",
    detail: "Waiting for new Tweets to be posted...",
};

const authMessage = {
    title: "Could not authenticate",
    details: [
      `Please make sure your bearer token is correct.`,
    ],
    type: "https://developer.twitter.com/en/docs/authentication",
};

const sleep = async (delay) => {
    return new Promise((resolve) => setTimeout(() => resolve(true), delay));
};
  
const streamTweets = (socket, token) => {
  
    const config = {
      url: streamURL,
      auth: {
        bearer: token,
      },
      timeout: 31000,
    };
    try {
      let stream = request.get(config);
      stream
        .on("data", (data) => {
          try {
            const json = JSON.parse(data);
            if (json.connection_issue) {
              socket.emit("error", json);
              reconnect(stream, socket, token);
            } else {
              if (json.data && json.includes.users) {
                let tweetData = {
                  ...json.data,
                  ...json.includes.users[0]
                }
                socket.emit("tweet", tweetData);
              } else {
                socket.emit("authError", json);
              }
            }
          } catch (e) {
            socket.emit("heartbeat");
          }
        })
        .on("error", (error) => {
          // Connection timed out
          console.log(error);
          socket.emit("error", errorMessage);
          reconnect(stream, socket, token);
        });
      socket.on("message", message => {
          console.log(message)
          if (message === "1") {
            console.log("Pausing Stream");
            stream.pause();
          }
          if (message === "0") {
            stream.resume();
          }
        });
      
      socket.on('disconnect', function(){
          console.log('user disconnected');
          socket.disconnect();
          stream.abort();
      });
    } catch (e) {
      console.log(e)
      socket.emit("authError", authMessage);
    }
  };
  
const reconnect = async (stream, socket, token) => {
    timeout++;
    stream.abort();
    await sleep(2 ** timeout * 1000);
    streamTweets(socket, token);
  };
  
io.on("connection", async (socket) => {
  try {
      console.log("Client connected.");
    //socket.emit("message", "Client connected");
    streamTweets(socket, token);
  } catch (e) {
      io.emit("authError", authMessage);
  }
});



module.exports = app;