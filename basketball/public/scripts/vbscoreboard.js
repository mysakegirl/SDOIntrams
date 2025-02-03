const socket = io();
repopulateLocalStorage();

socket.on('updateSet', () => {
    var currentSet = parseInt(document.getElementById('set').innerText);
    if(currentSet == 5){
        document.getElementById('set').innerText = "1";
        localStorage.setItem('vb-set',"1")
    }
    else{
        currentSet+= 1;
        document.getElementById('set').innerText = currentSet;
        localStorage.setItem('vb-set', currentSet)
    }
});

socket.on('plusSetWon', (team) => {
    var currentSet = parseInt(document.getElementById('t'+team+'-sw').innerText);
    if(currentSet != 3){
        currentSet+= 1;
        document.getElementById('t'+team+'-sw').innerText = currentSet;
        localStorage.setItem('vb-t'+team+'-sw', currentSet)
    }

});

socket.on('minusSetWon', (team) => {
    var currentSet = parseInt(document.getElementById('t'+team+'-sw').innerText);
    if(currentSet != 0){
        currentSet -= 1;
        document.getElementById('t'+team+'-sw').innerText = currentSet;
        localStorage.setItem('vb-t'+team+'-sw', currentSet)
    }
});

socket.on('plusVBScore', (team) => {
    var currentScore = parseInt(document.getElementById('vb-ts-'+team).innerText) + 1 ;
    document.getElementById('vb-ts-'+team).innerText = currentScore;
    localStorage.setItem('vb-ts-'+team, currentScore)
});

socket.on('minusVBScore', (team) => {
    var currentScore = parseInt(document.getElementById('vb-ts-'+team).innerText);
    if(currentScore != 0){
        currentScore -= 1;
        document.getElementById('vb-ts-'+team).innerText = currentScore;
        localStorage.setItem('vb-ts-'+team, currentScore)
    }
});

socket.on('updateVBTeamName', (t) => {
    document.getElementById('vbs-tn-' + t.team).innerText = t.name;
    document.getElementById('tablescore-tn' + t.team).innerText = t.name;
    localStorage.setItem('vbs-tn-'+t.team, t.name)
});

socket.on('updateVBTeamColor', (t) => {
    let elez = document.querySelectorAll('.vb-team'+ t.team);
    elez.forEach((elem) => {
        // elem.style.backgroundColor = t.color;
        elem.style.backgroundImage = "linear-gradient(180deg,"+t.color+",black)";
    })

    var el2 = document.getElementById('tablescore-tn'+t.team);
    el2.style.backgroundColor = t.color;
    localStorage.setItem('vbs-tc-'+t.team, t.color)
});


socket.on('clearScore', () => {
    document.getElementById('vb-ts-1').innerText = "0";
    document.getElementById('vb-ts-2').innerText = "0";
    localStorage.setItem('vb-ts-1', null)
    localStorage.setItem('vb-ts-2', null)
});

socket.on('resetVBGAme', () => {
    resetGameVB();
});

socket.on('setScoreTable', (t) => {
    document.getElementById('vb-t' + t.team + 's' + t.set).innerText = t.score;
    localStorage.setItem('vb-t' + t.team + 's' + t.set, t.score);
});

socket.on('evaluateScore', () => {
    let cellWinners = [], cellLosers = [];
    let table = document.getElementsByClassName('tableScore');
    let rt1 = table[0].rows[0];
    let lt1 = table[0].rows[1];
    for(var i = 1; i <= 5; i++){
        if(rt1.cells[i].textContent != "" && lt1.cells[i].textContent != ""){
            if(rt1.cells[i].textContent > lt1.cells[i].textContent){
                cellWinners.push(rt1.cells[i].id);
                cellLosers.push(lt1.cells[i].id)
            }else{
                cellLosers.push(rt1.cells[i].id);
                cellWinners.push(lt1.cells[i].id)
            }
        }
        else if(rt1.cells[i].textContent != "" || lt1.cells[i].textContent != ""){
            if(rt1.cells[i].textContent != ""){
                cellWinners.push(rt1.cells[i].id);
            }
            else{
                cellWinners.push(lt1.cells[i].id)
            }
        }
    }

    if(cellWinners.length != 0){
        for(var i = 0; i < cellWinners.length; i++){
            var e = document.getElementById(cellWinners[i]);
            e.style.color = "#00e676";
        }

        for(var i = 0; i < cellLosers.length; i++){
            var e = document.getElementById(cellLosers[i]);
            e.style.color = "#d50000";
        }
    }
});



function repopulateLocalStorage(){
    if(localStorage.getItem('vb-set') !== null && localStorage.getItem('vb-set') != "null"){
        document.getElementById('set').innerText = localStorage.getItem('vb-set');
    }

    //sets won
    if(localStorage.getItem('vb-t1-sw') !== null && localStorage.getItem('vb-t1-sw') != "null"){
        document.getElementById('t1-sw').innerText = localStorage.getItem('vb-t1-sw');
    }
    if(localStorage.getItem('vb-t2-sw') !== null && localStorage.getItem('vb-t2-sw') != "null"){
        document.getElementById('t2-sw').innerText = localStorage.getItem('vb-t2-sw');
    }

    //names
    if(localStorage.getItem('vbs-tn-1') !== null && localStorage.getItem('vbs-tn-1') != "null"){
        document.getElementById('vbs-tn-1').innerText = localStorage.getItem('vbs-tn-1');
        document.getElementById('tablescore-tn1').innerText = localStorage.getItem('vbs-tn-1');
    }
    if(localStorage.getItem('vbs-tn-2') !== null && localStorage.getItem('vbs-tn-2') != "null"){
        document.getElementById('vbs-tn-2').innerText = localStorage.getItem('vbs-tn-2');
        document.getElementById('tablescore-tn2').innerText = localStorage.getItem('vbs-tn-2');
    }

    //colors
    if(localStorage.getItem('vbs-tc-1') !== null && localStorage.getItem('vbs-tc-1') != "null"){
        // document.getElementById('tablescore-tn1').innerText = localStorage.getItem('vbs-tn-1');
        let elez = document.querySelectorAll('.vb-team1');
        elez.forEach((elem) => {
            elem.style.backgroundColor = localStorage.getItem('vbs-tc-1');
            elem.style.backgroundImage = "linear-gradient(180deg,"+localStorage.getItem('vbs-tc-1')+",black)";
        })
        
        var el2 = document.getElementById('tablescore-tn1');
        // el2.style.backgroundColor = localStorage.getItem('vbs-tc-1');
        el2.style.backgroundImage = "linear-gradient(180deg,"+localStorage.getItem('vbs-tc-1')+",black)";
    }
    if(localStorage.getItem('vbs-tc-2') !== null && localStorage.getItem('vbs-tc-2') != "null"){
        var ele = document.querySelectorAll('.vb-team2');
        ele.forEach(function(elem){
            // elem.style.backgroundColor = localStorage.getItem('vbs-tc-2');
            elem.style.backgroundImage = "linear-gradient(180deg,"+localStorage.getItem('vbs-tc-2')+",black)";
        })

        var el2 = document.getElementById('tablescore-tn2');
        // el2.style.backgroundColor = localStorage.getItem('vbs-tc-2');
        el2.style.backgroundImage = "linear-gradient(180deg,"+localStorage.getItem('vbs-tc-2')+",black)";
    }

    //scores
    if(localStorage.getItem('vb-ts-1') !== null && localStorage.getItem('vb-ts-1') != "null"){
        document.getElementById('vb-ts-1').innerText = localStorage.getItem('vb-ts-1');
    }
    if(localStorage.getItem('vb-ts-2') !== null && localStorage.getItem('vb-ts-2') != "null"){
        document.getElementById('vb-ts-2').innerText = localStorage.getItem('vb-ts-2');
    }

    tableScoreRepopulate();
}


function tableScoreRepopulate(){
    for(var i = 1; i <= 2; i++){
        for(var j = 1; j <= 5; j++){
            if(localStorage.getItem('vb-t'+i+'s'+j) !== null && localStorage.getItem('vb-t'+i+'s'+j) != "null"){
                document.getElementById('vb-t'+i+'s'+j).innerText = localStorage.getItem('vb-t'+i+'s'+j);
            }
        }
    }
}


function resetGameVB(){
    document.getElementById('vb-ts-1').innerText = "0";
    document.getElementById('vb-ts-2').innerText = "0";
    document.getElementById('set').innerText = "1";
    document.getElementById('t1-sw').innerText = "0";
    document.getElementById('t2-sw').innerText = "0";
    document.getElementById('vbs-tn-1').innerText = "Team 1";
    document.getElementById('tablescore-tn1').innerText = "Team 1";
    document.getElementById('vbs-tn-2').innerText = "Team 2";
    document.getElementById('tablescore-tn2').innerText = "Team 2";

    localStorage.setItem('vb-ts-1', null);
    localStorage.setItem('vb-ts-2', null);
    localStorage.setItem('vb-set', null);
    localStorage.setItem('vb-t1-sw', null);
    localStorage.setItem('vb-t2-sw', null);
    localStorage.setItem('vbs-tn-1', null);
    localStorage.setItem('vbs-tn-2', null);
    localStorage.setItem('vbs-tc-1', null);
    localStorage.setItem('vbs-tc-2', null);


    //colors
    let elez = document.querySelectorAll('.vb-team1');
    elez.forEach((elem) => {
        elem.style.backgroundColor = "#000000";
    })
    
    var el2 = document.getElementById('tablescore-tn1');
    el2.style.backgroundColor = "unset";

    let elez3 = document.querySelectorAll('.vb-team2');
    elez3.forEach((elem) => {
        elem.style.backgroundColor = "#000000";
    })
    
    var el3 = document.getElementById('tablescore-tn2');
    el3.style.backgroundColor = "unset";

    tableScoreClear();
}


function tableScoreClear(){
    let table = document.getElementsByClassName('tableScore');
    for(var i = 0; i <= 1; i++){
        let rt1 = table[0].rows[i];
        for(var j = 1; j <= 5; j++){
            rt1.cells[j].textContent = "";
            localStorage.setItem('vb-t'+(i+1)+'s'+j, null);
        }
    }
}