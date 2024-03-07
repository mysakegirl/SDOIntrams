const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'public'),));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'scoreboard.html'));
});

app.get('/scoreboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'scoring-panel.html'));
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle scoring events
    socket.on('scoreUpdate', (score) => {
        io.emit('updateScore', score);
    });

    socket.on('nameUpdate', (teamName) => {
        io.emit('updateName', teamName);
    });

    socket.on('quarterUpdate', () => {
        io.emit('updateQuarter');
    });

    socket.on('colorUpdate', (color) => {
        io.emit('updateColor', color);
    });

    socket.on('gameReset', () => {
        io.emit('resetGame');
    });

    socket.on('minuteAdd', () => {
        io.emit('addMinute');
    });

    socket.on('minuteMinus', () => {
        io.emit('minusMinute');
    });

    socket.on('secondAdd', () => {
        io.emit('addSecond');
    });

    socket.on('secondMinus', () => {
        io.emit('minusSecond');
    });

    socket.on('timeStart', () => {
        io.emit('startTime');
    });

    socket.on('timeStop', () => {
        io.emit('stopTime');
    });

    socket.on('gameclockReset', () => {
        io.emit('resetGameClock');
    });

    socket.on('reset14', () => {
        io.emit('resetTo14');
    });

    socket.on('reset24', () => {
        io.emit('resetTo24');
    });

    socket.on('scAdd', () => {
        io.emit('addSC');
    });
    socket.on('scMinus', () => {
        io.emit('minusSC');
    });

    socket.on('scStart', () => {
        io.emit('StartSC');
    });
    socket.on('scStop', () => {
        io.emit('StopSC');
    });

    socket.on('hornEnd', () => {
        io.emit('endHorn');
    });


    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

});

const PORT = process.env.PORT || 3000;
// const IP_ADDRESS = '192.168.2.116'
// , 
server.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
