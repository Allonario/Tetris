let enter_button = document.getElementById("enter_button");
enter_button.addEventListener("click", getName);
let manager = new LocalStorageManager();
document.getElementById("name_input").value = localStorage.getItem('current player');
manager.updateScoreTable();
if(!localStorage.getItem('leaderboard')){
    let leaderboard = {};
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function getName() {
    let input = document.getElementById("name_input");
    let name = input.value
    if(name) {
        localStorage.setItem('current player', name);
        location.href = "game/";
    }
}