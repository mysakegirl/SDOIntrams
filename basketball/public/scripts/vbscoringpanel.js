const socket = io();


function updateSet(){
    socket.emit('setUpdate');
}

function plusSetWon(team){
    socket.emit('setwonPlus', team);
}

function minusSetWon(team){
    socket.emit('setwonMinus', team);
}

function updateVBTeamName(team){
    var name = document.getElementById('vbs-tn'+team).value;
    socket.emit('vbTeamNameUpdate', {team, name});
}

function updateVBTeamColor(team){
    var color = document.getElementById('vbs-tc'+team).value;
    socket.emit('vbTeamColorUpdate', {team, color});
}

function plusVBScore(team){
    socket.emit('vbScorePlus', team);
}
function minusVBScore(team){
    socket.emit('vbScoreMinus', team);
}

function setScoreTable(team,set){
    var score = document.getElementById('t'+team+'s'+set).value;
    socket.emit('scoreTableSet', {team, set, score});
}

function evaluateScore(){
    socket.emit('scoreEvaluate');
}

function clearScore(){
   var res = confirm("Are you sure you want to reset score?");

   if(res == true){
        socket.emit('scoreClear');
   }
}

function resetVBGame(){
    var res = confirm("Are you sure you want to reset the game?");
    if(res == true){
         socket.emit('vbGameReset');
    }
}


// function resetGame(){
//     var res = confirm("Are you sure you want to reset the game?");
//     if(res == true){
//         socket.emit('gameReset');

//         localStorage.setItem('ts-1', null);
//         localStorage.setItem('ts-2', null);
//         localStorage.setItem('tn-1', null);
//         localStorage.setItem('tn-2', null);
//         localStorage.setItem('quarter', null);
//         localStorage.setItem('team1', null);
//         localStorage.setItem('team2', null);

//         document.getElementById('t1-n').value = '';
//         document.getElementById('t2-n').value = '';
//         document.getElementById('color-1').value = '#000000';
//         document.getElementById('color-2').value = '#000000';
//     }
// }
