const socket = io();
checkInitials();

function updateScore(sc,team){
    socket.emit('scoreUpdate', {sc, team});
}

function updateName(team){
    var name =  document.getElementById('t'+team+'-n').value;
    localStorage.setItem('tn-' + team,name)

    socket.emit('nameUpdate', {name, team});
}

function updateQuarter(){
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

        document.getElementById('t1-n').value = '';
        document.getElementById('t2-n').value = '';
        document.getElementById('color-1').value = '#000000';
        document.getElementById('color-2').value = '#000000';
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
}


function addMinute(){
    socket.emit('minuteAdd');
}

function minusMinute(){
    socket.emit('minuteMinus');
}


function addSecond(){
    socket.emit('secondAdd');
}

function minusSecond(){
    socket.emit('secondMinus');
}


function startTime(){
    var gc = document.getElementById('gcstart');
    gc.classList.add('active-btn');
    socket.emit('timeStart');
}

function stopTime(){
    var gc = document.getElementById('gcstart');
    if(gc.classList.contains('active-btn')){
        document.getElementById('gcstart').classList.remove('active-btn');
    }
    socket.emit('timeStop');
}

function resetGameClock(){
    var res = confirm("Are you sure you want to reset game clock?");
    if(res == true){
        socket.emit('gameclockReset');
    }
}

function StartSC(){
    var sc = document.getElementById('startShotClock');
    sc.classList.add('active-btn');
  
    socket.emit('scStart');
}

function StopSC(){
    var sc = document.getElementById('startShotClock');
    if(sc.classList.contains('active-btn')){
        document.getElementById('startShotClock').classList.remove('active-btn');
    }
    socket.emit('scStop');
}

function addSC(){
    socket.emit('scAdd');
}

function minusSC(){
    socket.emit('scMinus');
}

function resetTo14(){
    socket.emit('reset14');
}

function resetTo24(){
    socket.emit('reset24');
}

function endHorn(){
    socket.emit('hornEnd');
}


function simulStart(){
    var gc = document.getElementById('gcstart');
    var sc = document.getElementById('startShotClock');
    gc.click();
    sc.click();
}
function simulStop(){
    var gc = document.getElementById('gcstop');
    var sc = document.getElementById('scstop');
    gc.click();
    sc.click();
}