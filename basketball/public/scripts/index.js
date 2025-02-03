

function mainMenu(id){
    var main = document.getElementById('menu-mainid');
    main.style.display = "none";

    var submain = document.getElementById('menu'+id);
    submain.style.display = "flex";
}


function backtoMenu(){
    var submain1 = document.getElementById('menu1');
    var submain2 = document.getElementById('menu2');
    submain1.style.display = "none";
    submain2.style.display = "none";

    var main = document.getElementById('menu-mainid');
    main.style.display = "flex";
}