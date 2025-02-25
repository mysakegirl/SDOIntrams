const socket = io();
let _gcInterval  = null;
let _scInterval = null;

// socket.on('updateScore', (score) => {
//     document.getElementById('score').innerText = score;
// });
checkLocalStorage();

socket.on('emitData', (data) =>{
    document.getElementById('ts-1').innerText = data.ts1;
    localStorage.setItem('ts-1',data.ts1)
    localStorage.setItem('team1', data.color1)
    document.getElementById('ts-2').innerText = data.ts2;
    localStorage.setItem('ts-2',data.ts2)
    localStorage.setItem('team2', data.color2)
    document.getElementById('tf-1').innerText = data.tf1;
    localStorage.setItem('tf-1',data.tf1)
    document.getElementById('tf-2').innerText = data.tf2;
    localStorage.setItem('tf-2',data.tf2)
    document.getElementById('tn-1').innerText = data.tn1;
    localStorage.setItem('tn-1',data.tn1)
    document.getElementById('tn-2').innerText = data.tn2;
    localStorage.setItem('tn-2',data.tn2)
    document.getElementById('quarter').innerText = data.quarter;
    localStorage.setItem('quarter', data.quarter)
    document.getElementById('shot-clock').innerText = data.shotclock;
    localStorage.setItem('shotclock', data.shotclock)
    document.getElementById('timer-m').innerText = data.timerm;
    localStorage.setItem('timer-m', data.timerm)
    document.getElementById('timer-s').innerText = data.timers;
    localStorage.setItem('timer-s', data.timers)

    var ele = document.querySelectorAll('.team1');
    ele.forEach(function(elem){
        elem.style.backgroundImage = "linear-gradient(180deg,"+data.color1+",black)";
    })

    var ele2 = document.querySelectorAll('.team2');
    ele2.forEach(function(elem){
        elem.style.backgroundImage = "linear-gradient(180deg,"+data.color2+",black)";
    })
})

socket.on('updateScore', (score) => {
    var currentScore = parseInt(document.getElementById('ts-'+ score.team).innerText) + score.sc;
    if(currentScore < 0){
        document.getElementById('ts-'+ score.team).innerText = "0";
        localStorage.setItem('ts-' + score.team,"0")
    }else{
        document.getElementById('ts-'+ score.team).innerText = currentScore;
        localStorage.setItem('ts-' + score.team,currentScore)
    }
});

socket.on('updateTeamFoul', (tf) => {
    var currentTF = parseInt(document.getElementById('tf-'+ tf.team).innerText) + tf.sc;
    if(currentTF < 0){
        document.getElementById('tf-'+ tf.team).innerText = "0";
        localStorage.setItem('tf-' + tf.team,"0")
    }else{
        document.getElementById('tf-'+ tf.team).innerText = currentTF;
        localStorage.setItem('tf-' + tf.team,currentTF)
    }
});

socket.on('updateName', (teamName) => {
    var currentName = teamName.name;
    document.getElementById('tn-'+ teamName.team).innerText = currentName;
    updateFontSize(document.getElementById('tn-'+ teamName.team));
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
socket.on('endBuzzer', () => {
    playBuzzer();
});


socket.on('resetGame', () => {
    localStorage.setItem('ts-1', null);
    localStorage.setItem('ts-2', null);
    localStorage.setItem('tf-1', null);
    localStorage.setItem('tf-2', null);
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
    document.getElementById('tf-1').innerText = "0";
    document.getElementById('tf-2').innerText = "0";
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

     //check team fouls
     if(localStorage.getItem('tf-1') !== null && localStorage.getItem('tf-1') != "null"){
        document.getElementById('tf-1').innerText = localStorage.getItem('tf-1');
    }
    if(localStorage.getItem('tf-2') !== null && localStorage.getItem('tf-2') != "null"){
        document.getElementById('tf-2').innerText = localStorage.getItem('tf-2');
    }

    //check names
    if(localStorage.getItem('tn-1') !== null && localStorage.getItem('tn-1') != "null"){
        document.getElementById('tn-1').innerText = localStorage.getItem('tn-1');
        updateFontSize(document.getElementById('tn-1'));
    }
    if(localStorage.getItem('tn-2') !== null && localStorage.getItem('tn-2') != "null"){
        document.getElementById('tn-2').innerText = localStorage.getItem('tn-2');
        updateFontSize(document.getElementById('tn-2'));
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
        playHorn();
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

function playBuzzer(){
    const buzzer = document.getElementById('buzzerid');
    buzzer.play();
}

function scCountDown(){
    var currentSC = parseInt(document.getElementById('shot-clock').innerText);

    currentSC--;

    if(currentSC <= 0){
        clearInterval(_scInterval);
        document.getElementById('shot-clock').innerText = "0";
        localStorage.setItem('shot-clock', "0");
        playBuzzer();
    }
    else{
        document.getElementById('shot-clock').innerText = currentSC;
        localStorage.setItem('shot-clock', currentSC);
    }
}

function updateFontSize(elem){
    if(elem.innerText.length <= 10){
        elem.style.fontSize = '8rem';
    }else{
        elem.style.fontSize = '6rem';
    }
}