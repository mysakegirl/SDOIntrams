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
    const currentTime = new Date().toLocaleString();
    console.log(`[${currentTime}] A user connected`);

    // Handle scoring events
    socket.on('scoreUpdate', (score) => {
        io.emit('updateScore', score);
    });

    socket.on('teamFoulUpdate', (foul) => {
        io.emit('updateTeamFoul', foul);
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
    
    socket.on('dataEmit', (data) => {
        io.emit('emitData', data);
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
    socket.on('buzzerEnd', () => {
        io.emit('endBuzzer');
    });



    // volleyball
    socket.on('setUpdate', () => {
        io.emit('updateSet');
    });

    socket.on('setwonPlus', (team) => {
        io.emit('plusSetWon', team);
    });
    
    socket.on('setwonMinus', (team) => {
        io.emit('minusSetWon', team);
    });

    socket.on('vbTeamNameUpdate', (t) => {
        io.emit('updateVBTeamName', t);
    });
  
    socket.on('vbTeamColorUpdate', (t) => {
        io.emit('updateVBTeamColor', t);
    });
    
    socket.on('vbScorePlus', (t) => {
        io.emit('plusVBScore', t);
    });
      
    socket.on('vbScoreMinus', (t) => {
        io.emit('minusVBScore', t);
    });
    
    socket.on('scoreEvaluate', () => {
        io.emit('evaluateScore');
    });

    socket.on('scoreTableSet', (t) => {
        io.emit('setScoreTable', t);
    });

    socket.on('scoreClear', () => {
        io.emit('clearScore');
    });

    socket.on('vbGameReset', () => {
        io.emit('resetVBGAme');
    });

    socket.on('shoutoutSend', (mess) => {
        io.emit('sendShoutOut', mess);
    });

    //end

    socket.on('disconnect', () => {
        const disconnectTime = new Date().toLocaleString();
        console.log(`[${disconnectTime}] user disconnected`);
    });

});

const PORT = process.env.PORT || 3000;
// const IP_ADDRESS = '192.168.2.124'
// , IP_ADDRESS,
server.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
