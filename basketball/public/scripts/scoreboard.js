const socket = io();
let _gcInterval  = null;
let _scInterval = null;

// socket.on('updateScore', (score) => {
//     document.getElementById('score').innerText = score;
// });
checkLocalStorage();


socket.on('updateScore', (score) => {
    var currentScore = parseInt(document.getElementById('ts-'+ score.team).innerText) + score.sc;
    if(currentScore < 0){
        document.getElementById('ts-'+ score.team).innerText = "00";
        localStorage.setItem('ts-' + score.team,"00")
    }else{
        document.getElementById('ts-'+ score.team).innerText = currentScore;
        localStorage.setItem('ts-' + score.team,currentScore)
    }
  
});

socket.on('updateName', (teamName) => {
    var currentName = teamName.name;
    document.getElementById('tn-'+ teamName.team).innerText = currentName;
    localStorage.setItem('tn-' + teamName.team,currentName)
});

socket.on('updateQuarter', () => {
    var currentQuarter = parseInt(document.getElementById('quarter').innerText);
    currentQuarter = (currentQuarter == 4 ? 1 : currentQuarter+=1);
    document.getElementById('quarter').innerText = currentQuarter;
    localStorage.setItem('quarter', currentQuarter)
});

socket.on('updateColor', (teamColor) => {
    var ele = document.querySelectorAll('.team'+ teamColor.team);
    ele.forEach(function(elem){
        // elem.style.backgroundColor = teamColor.color;
        elem.style.backgroundImage = "linear-gradient(180deg,"+teamColor.color+",black)";
    })
    localStorage.setItem('team' + teamColor.team, teamColor.color)

});


socket.on('addMinute', () => {
    var currentMinute = parseInt(document.getElementById('timer-m').innerText) + 1;
    document.getElementById('timer-m').innerText = currentMinute;
    localStorage.setItem('timer-m', currentMinute)
});


socket.on('minusMinute', () => {
    var currentMinute = parseInt(document.getElementById('timer-m').innerText);
    currentMinute = (currentMinute <= 1 ? 0 : currentMinute -= 1);
    document.getElementById('timer-m').innerText = currentMinute;
    localStorage.setItem('timer-m', currentMinute)
});

socket.on('addSecond', () => {
    var currentSecond = parseInt(document.getElementById('timer-s').innerText) + 1;
    if(currentSecond < 10){ currentSecond = "0" + currentSecond }
    document.getElementById('timer-s').innerText = currentSecond;
    localStorage.setItem('timer-s', currentSecond)
});

socket.on('minusSecond', () => {
    var currentSecond = parseInt(document.getElementById('timer-s').innerText);
    currentSecond = (currentSecond <= 1 ? 0 : currentSecond -= 1);
    if(currentSecond < 10){ currentSecond = "0" + currentSecond }
    document.getElementById('timer-s').innerText = currentSecond;
    localStorage.setItem('timer-s', currentSecond)
});


socket.on('startTime', () => {
    if(_gcInterval == null){
        _gcInterval = setInterval(timerCountDown, 1000)
    }
});

socket.on('stopTime', () => {
    clearInterval(_gcInterval);
    _gcInterval = null;
});

socket.on('StartSC', () => {
    if(_scInterval == null){
        _scInterval = setInterval(scCountDown, 1000)
    }
});

socket.on('StopSC', () => {
    clearInterval(_scInterval);
    _scInterval = null;
});

socket.on('resetGameClock', () => {
    localStorage.setItem('timer-m', null);
    localStorage.setItem('timer-s', null);

    document.getElementById('timer-m').innerText = "10";
    document.getElementById('timer-s').innerText = "00";
});

socket.on('resetTo14', () => {
    if(_scInterval != null){
        clearInterval(_scInterval);
        _scInterval = null;
        _scInterval = setInterval(scCountDown, 1000)
    }
    localStorage.setItem('shotclock', 14);
    document.getElementById('shot-clock').innerText = "14";
});

socket.on('resetTo24', () => {
    if(_scInterval != null){
        clearInterval(_scInterval);
        _scInterval = null;
        _scInterval = setInterval(scCountDown, 1000)
    }
    localStorage.setItem('shotclock', 24);
    document.getElementById('shot-clock').innerText = "24";
});

socket.on('addSC', () => {
    var currentSC = parseInt(document.getElementById('shot-clock').innerText);
    currentSC = (currentSC == 24 ? 24 : currentSC+=1);
    document.getElementById('shot-clock').innerText = currentSC;
    localStorage.setItem('shotclock', currentSC);
});

socket.on('minusSC', () => {
    var currentSC = parseInt(document.getElementById('shot-clock').innerText);
    currentSC = (currentSC <= 0 ? 0 : currentSC-=1);
    document.getElementById('shot-clock').innerText = currentSC;
    localStorage.setItem('shotclock', 24);
});

socket.on('endHorn', () => {
    console.log('horn');
    playHorn();
});


socket.on('resetGame', () => {
    localStorage.setItem('ts-1', null);
    localStorage.setItem('ts-2', null);
    localStorage.setItem('tn-1', null);
    localStorage.setItem('tn-2', null);
    localStorage.setItem('quarter', null);
    localStorage.setItem('team1', null);
    localStorage.setItem('team2', null);

    localStorage.setItem('timer-m', null);
    localStorage.setItem('timer-s', null);
    localStorage.setItem('shot-clock', null);

    document.getElementById('ts-1').innerText = "00";
    document.getElementById('ts-2').innerText = "00";
    document.getElementById('tn-1').innerText = "Team 1";
    document.getElementById('tn-2').innerText = "Team 2";
    document.getElementById('quarter').innerText = "1";

    document.getElementById('timer-m').innerText = "10";
    document.getElementById('timer-s').innerText = "00";
    document.getElementById('shot-clock').innerText = "24";

    var ele = document.querySelectorAll('.team1');
    ele.forEach(function(elem){
        // elem.style.backgroundColor = '#000';
        elem.style.backgroundImage = "none";
    })
    ele = document.querySelectorAll('.team2');
    ele.forEach(function(elem){
        // elem.style.backgroundColor = '#000';
        elem.style.backgroundImage = "none";
    })
});


function checkLocalStorage(){
    //check scores
    if(localStorage.getItem('ts-1') !== null && localStorage.getItem('ts-1') != "null"){
        document.getElementById('ts-1').innerText = localStorage.getItem('ts-1');
    }
    if(localStorage.getItem('ts-2') !== null && localStorage.getItem('ts-2') != "null"){
        document.getElementById('ts-2').innerText = localStorage.getItem('ts-2');
    }

    //check names
    if(localStorage.getItem('tn-1') !== null && localStorage.getItem('tn-1') != "null"){
        document.getElementById('tn-1').innerText = localStorage.getItem('tn-1');
    }
    if(localStorage.getItem('tn-2') !== null && localStorage.getItem('tn-2') != "null"){
        document.getElementById('tn-2').innerText = localStorage.getItem('tn-2');
    }

    //check quarter
    if(localStorage.getItem('quarter') !== null && localStorage.getItem('quarter') != "null"){
        document.getElementById('quarter').innerText = localStorage.getItem('quarter');
    }

    //check colors
    if(localStorage.getItem('team1') !== null && localStorage.getItem('team1') != "null"){
        // document.querySelectorAll('.team1').style.backgroundColor = localStorage.getItem('team1');
        let elem = document.querySelectorAll('.team1');
        elem.forEach(function(el){
            // el.style.backgroundColor = localStorage.getItem('team1');
        el.style.backgroundImage = "linear-gradient(180deg,"+localStorage.getItem('team1')+",black)";

        })
    }
    if(localStorage.getItem('team2') !== null && localStorage.getItem('team2') != "null"){
        // document.querySelectorAll('.team2').style.backgroundColor = localStorage.getItem('team2');
        let elem = document.querySelectorAll('.team2');
        elem.forEach(function(el){
            // el.style.backgroundColor = localStorage.getItem('team2');
            el.style.backgroundImage = "linear-gradient(180deg,"+localStorage.getItem('team2')+",black)";
                
        })
    }

    if(localStorage.getItem('timer-m') !== null && localStorage.getItem('timer-m') != "null"){
        document.getElementById('timer-m').innerText = localStorage.getItem('timer-m');
    }
    if(localStorage.getItem('timer-s') !== null && localStorage.getItem('timer-s') != "null"){
        document.getElementById('timer-s').innerText = localStorage.getItem('timer-s');
    }
    if(localStorage.getItem('shot-clock') !== null && localStorage.getItem('shot-clock') != "null"){
        document.getElementById('shot-clock').innerText = localStorage.getItem('shot-clock');
    }
}

function timerCountDown(){
    var currentMinute = parseInt(document.getElementById('timer-m').innerText);
    var currentSeconds = parseInt(document.getElementById('timer-s').innerText);

    //lets convert everything to seconds para dali hehehe
    var m_to_seconds = currentMinute * 60;
    var totalSeconds = m_to_seconds + currentSeconds;

    totalSeconds--;

    if(totalSeconds <= 0){
        clearInterval(_gcInterval);
        _gcInterval = null;
        document.getElementById('timer-m').innerText = "00";
        document.getElementById('timer-s').innerText = "00";

        localStorage.setItem('timer-m', "00");
        localStorage.setItem('timer-s', "00");
    }
    else{
        document.getElementById('timer-m').innerText = Math.floor(totalSeconds / 60);
        var secs = totalSeconds % 60;
        if(secs < 10){ secs = "0" + secs }
        document.getElementById('timer-s').innerText = secs;

        localStorage.setItem('timer-m', Math.floor(totalSeconds / 60));
        localStorage.setItem('timer-s', secs);
    }
}


function playHorn(){
    const horn = document.getElementById('hornid');
    horn.play();
}


function scCountDown(){
    var currentSC = parseInt(document.getElementById('shot-clock').innerText);

    currentSC--;

    if(currentSC <= 0){
        clearInterval(_scInterval);
        document.getElementById('shot-clock').innerText = "0";
        localStorage.setItem('shot-clock', "0");
    }
    else{
        document.getElementById('shot-clock').innerText = currentSC;
        localStorage.setItem('shot-clock', currentSC);
    }
}

