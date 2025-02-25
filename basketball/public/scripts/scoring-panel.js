const socket = io();
checkInitials();
let _gcInterval  = null;
let _scInterval = null;
let _scDisabled = null;

function updateScore(sc,team){
    var currentScore = parseInt(document.getElementById('ts-'+ team).innerText) + sc;
    if(currentScore < 0){
        document.getElementById('ts-'+ team).innerText = "0";
        localStorage.setItem('ts-' + team,"0")
    }else{
        document.getElementById('ts-'+ team).innerText = currentScore;
        localStorage.setItem('ts-' + team,currentScore)
    }
    socket.emit('scoreUpdate', {sc, team});
}

function updateTeamFoul(sc, team){
    var currentTF = parseInt(document.getElementById('tf-'+ team).innerText) + sc;
    if(currentTF < 0){
        document.getElementById('tf-'+ team).innerText = "0";
        localStorage.setItem('tf-' + team,"0")
    }else{
        document.getElementById('tf-'+ team).innerText = currentTF;
        localStorage.setItem('tf-' + team,currentTF)
    }
    socket.emit('teamFoulUpdate', {sc, team});
}

function updateName(team){
    var name =  document.getElementById('t'+team+'-n').value;
    localStorage.setItem('tn-' + team,name)
    socket.emit('nameUpdate', {name, team});
}

function updateQuarter(){
    var currentQuarter = parseInt(document.getElementById('sp-period').innerText);
    currentQuarter = (currentQuarter == 4 ? 1 : currentQuarter+=1);
    document.getElementById('sp-period').innerText = currentQuarter;
    socket.emit('quarterUpdate');
}

function updateColor(team){
    var color = document.getElementById('color-'+team).value;

    localStorage.setItem('team' + team, color)

    socket.emit('colorUpdate', { color, team});
}

function resetGame(){
    var res = confirm("Are you sure you want to reset the game?");
    if(res == true){
        socket.emit('gameReset');

        localStorage.setItem('ts-1', null);
        localStorage.setItem('ts-2', null);
        localStorage.setItem('tn-1', null);
        localStorage.setItem('tn-2', null);
        localStorage.setItem('quarter', null);
        localStorage.setItem('team1', null);
        localStorage.setItem('team2', null);
        localStorage.setItem('tf-1', null);
        localStorage.setItem('tf-2', null);
        localStorage.setItem('timer-m', null);
        localStorage.setItem('timer-s', null);
        localStorage.setItem('shot-clock', null);

        document.getElementById('t1-n').value = '';
        document.getElementById('t2-n').value = '';
        document.getElementById('tf-1').value = '0';
        document.getElementById('tf-2').value = '0';
        document.getElementById('sp-period').value = '1';
        document.getElementById('color-1').value = '#000000';
        document.getElementById('color-2').value = '#000000';

        document.getElementById('t1-n').innerText = "";
        document.getElementById('t2-n').innerText = "";

        document.getElementById('timer-m').innerText = "10";
        document.getElementById('timer-s').innerText = "00";
        document.getElementById('shot-clock').innerText = "24";
    }
}


function checkInitials(){
        //check names
        if(localStorage.getItem('tn-1') !== null && localStorage.getItem('tn-1') != "null"){
            document.getElementById('t1-n').value = localStorage.getItem('tn-1');
        }
        if(localStorage.getItem('tn-2') !== null && localStorage.getItem('tn-2') != "null"){
            document.getElementById('t2-n').value = localStorage.getItem('tn-2');
        }

        if(localStorage.getItem('team1') !== null && localStorage.getItem('team1') != "null"){
            // document.querySelectorAll('.team1').style.backgroundColor = localStorage.getItem('team1');
            document.getElementById('color-1').value = localStorage.getItem('team1');
        }

        if(localStorage.getItem('team2') !== null && localStorage.getItem('team2') != "null"){
            // document.querySelectorAll('.team2').style.backgroundColor = localStorage.getItem('team2');
            document.getElementById('color-2').value = localStorage.getItem('team2');
        }

        //check team fouls
        if(localStorage.getItem('tf-1') !== null && localStorage.getItem('tf-1') != "null"){
            document.getElementById('tf-1').innerText = localStorage.getItem('tf-1');
        }
        if(localStorage.getItem('tf-2') !== null && localStorage.getItem('tf-2') != "null"){
            document.getElementById('tf-2').innerText = localStorage.getItem('tf-2');
        }

        //check quarter
        if(localStorage.getItem('quarter') !== null && localStorage.getItem('quarter') != "null"){
            document.getElementById('sp-period').innerText = localStorage.getItem('quarter');
        }
        //check scores
        if(localStorage.getItem('ts-1') !== null && localStorage.getItem('ts-1') != "null"){
            document.getElementById('ts-1').innerText = localStorage.getItem('ts-1');
        }
        if(localStorage.getItem('ts-2') !== null && localStorage.getItem('ts-2') != "null"){
            document.getElementById('ts-2').innerText = localStorage.getItem('ts-2');
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


function addMinute(){
    var currentMinute = parseInt(document.getElementById('timer-m').innerText) + 1;
    document.getElementById('timer-m').innerText = currentMinute;
    localStorage.setItem('timer-m', currentMinute)
    socket.emit('minuteAdd');
}

function minusMinute(){
    var currentMinute = parseInt(document.getElementById('timer-m').innerText);
    currentMinute = (currentMinute <= 1 ? 0 : currentMinute -= 1);
    document.getElementById('timer-m').innerText = currentMinute;
    localStorage.setItem('timer-m', currentMinute)
    socket.emit('minuteMinus');
}


function addSecond(){
    var currentSecond = parseInt(document.getElementById('timer-s').innerText) + 1;
    if(currentSecond < 10){ currentSecond = "0" + currentSecond }
    document.getElementById('timer-s').innerText = currentSecond;
    localStorage.setItem('timer-s', currentSecond)
    socket.emit('secondAdd');
}

function minusSecond(){
    var currentSecond = parseInt(document.getElementById('timer-s').innerText);
    currentSecond = (currentSecond <= 1 ? 0 : currentSecond -= 1);
    if(currentSecond < 10){ currentSecond = "0" + currentSecond }
    document.getElementById('timer-s').innerText = currentSecond;
    localStorage.setItem('timer-s', currentSecond)
    socket.emit('secondMinus');
}


function startTime(){
    var gc = document.getElementById('gcstart');
    gc.classList.add('active-btn');
    if(_gcInterval == null){
        _gcInterval = setInterval(timerCountDown, 1000)
    }
    socket.emit('timeStart');
}

function stopTime(){
    var gc = document.getElementById('gcstart');
    if(gc.classList.contains('active-btn')){
        document.getElementById('gcstart').classList.remove('active-btn');
    }
    clearInterval(_gcInterval);
    _gcInterval = null;
    socket.emit('timeStop');
}

function resetGameClock(){
    var res = confirm("Are you sure you want to reset game clock?");
    if(res == true){
        socket.emit('gameclockReset');
    }
}

function disableSC(){
    var sdb = document.getElementById('sc-disable-btn');
    if(sdb.classList.length > 0){
        sdb.classList.remove('sc-disabled');
    }
    else{
        sdb.classList.add('sc-disabled');
    }
}

function StartSC(){
    // var sc = document.getElementById('startShotClock');
    // sc.classList.add('active-btn');
    if(_scInterval == null){
        _scInterval = setInterval(scCountDown, 1000)
    }
    socket.emit('scStart');
}

function StopSC(){
    // var sc = document.getElementById('startShotClock');
    // if(sc.classList.contains('active-btn')){
    //     document.getElementById('startShotClock').classList.remove('active-btn');
    // }
    clearInterval(_scInterval);
    _scInterval = null;
    socket.emit('scStop');
}

function addSC(){
    var currentSC = parseInt(document.getElementById('shot-clock').innerText);
    currentSC = (currentSC == 24 ? 24 : currentSC+=1);
    document.getElementById('shot-clock').innerText = currentSC;
    localStorage.setItem('shotclock', currentSC);
    socket.emit('scAdd');
}

function minusSC(){
    var currentSC = parseInt(document.getElementById('shot-clock').innerText);
    currentSC = (currentSC <= 0 ? 0 : currentSC-=1);
    document.getElementById('shot-clock').innerText = currentSC;
    localStorage.setItem('shotclock', 24);
    socket.emit('scMinus');
}

function resetTo14(){
    if(_scInterval != null){
        clearInterval(_scInterval);
        _scInterval = null;
        _scInterval = setInterval(scCountDown, 1000)
    }
    localStorage.setItem('shotclock', 14);
    document.getElementById('shot-clock').innerText = "14";
    socket.emit('reset14');
}

function resetTo24(){
    if(_scInterval != null){
        clearInterval(_scInterval);
        _scInterval = null;
        _scInterval = setInterval(scCountDown, 1000)
    }
    localStorage.setItem('shotclock', 24);
    document.getElementById('shot-clock').innerText = "24";
    socket.emit('reset24');
}

function endHorn(){
    socket.emit('hornEnd');
}
function endBuzzer(){
    socket.emit('buzzerEnd');
}

function simulStart(){
    // var sc = document.getElementById('startShotClock');
    // gc.click();
    // sc.click();
    var gc = document.getElementById('gcstart');
    gc.classList.add('active-btn');
    startTime();
    StartSC();
}
function simulStop(){
    // var gc = document.getElementById('gcstop');
    // var sc = document.getElementById('scstop');
    // gc.click();
    // sc.click();
    var gcstart = document.getElementById('gcstart');
    gcstart.classList.remove('active-btn');
    stopTime();
    StopSC();
}


function toggleHide(){
    var elem = document.getElementById('gen-id');
    var btn = document.getElementById('gen-btn');
    if(elem.classList.contains('showContent')){
        elem.classList.remove('showContent');
        elem.classList.add('hideContent');
        btn.innerText = 'Unhide';
    }else{
        elem.classList.remove('hideContent');
        elem.classList.add('showContent');
        btn.innerText = 'Hide';
    }
}


function scCountDown(){
    var currentSC = parseInt(document.getElementById('shot-clock').innerText);
    currentSC--;

    if(currentSC <= 0){
        clearInterval(_scInterval);
        document.getElementById('shot-clock').innerText = "0";
        localStorage.setItem('shot-clock', "0");
        // playBuzzer();
    }
    else{
        document.getElementById('shot-clock').innerText = currentSC;
        localStorage.setItem('shot-clock', currentSC);
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
        // playHorn();
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