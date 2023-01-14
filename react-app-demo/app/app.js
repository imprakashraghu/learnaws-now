const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const port = process.env.PORT || 4001;
const index = require("./index");

const app = express();
app.use(express.static('public/'))

const votes = {
    "0": { votes: 0, label: 'Usefull', color: 'rgba(0, 255, 0, 0.5)'},
    "1": { votes: 0, label: 'Enjoyed', color: 'rgba(0, 0, 255, 0.5)' },
    "2": { votes: 0, label: 'Bored', color: 'rgba(255, 0, 0, 0.5)' },
};

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

io.on("connection", (socket) => {

    console.log('Client has connected');

    io.emit('update', votes);

    socket.on('vote', (index) => {
        if (votes[index]) {
            votes[index].votes += 1;
        }
        io.emit('update', votes);
    });

});

app.use(cors());

server.listen(port, () => console.log(`Listening on port ${port}`));