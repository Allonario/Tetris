class LocalStorageManager {

    addLocalStorageScore(name, score){
        let leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
        if(!leaderboard[name] || score > leaderboard[name]) {
            leaderboard[name] = score;
            localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
        }
    }

    updateScoreTable(){
        let leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
        let tmp = Object.entries(leaderboard);
        tmp.sort((x, y) => y[1] - x[1]);
        for(let i = 0; i < 5; i++){
            if(tmp[i]) {
                document.getElementById((i + 1) + '_name').textContent = tmp[i][0];
                document.getElementById((i + 1) + '_score').textContent = JSON.stringify(tmp[i][1]);
            }
        }
    }
}