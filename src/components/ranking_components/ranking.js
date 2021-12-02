import { squidDatabase } from "../../datasources/firebase"; 

let gStatus = [false, false, false];
function detectGame(puzzleGameStatus, upDownGameStatus, MukchipaGameStatus) {
    gStatus[0] = puzzleGameStatus;
    gStatus[1] = upDownGameStatus;
    gStatus[2] = MukchipaGameStatus;
}

let currentScore = 0;
function recordNewRank(game, userId, name, score) {
    currentScore = score;
    squidDatabase.ref(game + '/' + userId).on('value', (snapshot) => {
        const userRecordData = snapshot.val();
        if(userRecordData === null ||userRecordData.user_score < score){
            squidDatabase.ref(game + '/' + userId).set({
                user_name: name,
                user_score: score,
            });
        }
    });
}

function recordCurrentScore(score) {
    currentScore = score;
}

let userHighScore;
function readUserHighScore(game, userId) {
    squidDatabase.ref(game + '/' + userId).on('value', (snapshot) => {
        const userRecordData = snapshot.val();
        userHighScore = userRecordData.user_score;
        return userHighScore;
    })
}


// let userRank = [[],[],[]];
// function setUserRank(game, record, score){
//     if(game === 'puzzle_game'){
//         userRank[0].push(game);
//         userRank[0].push(record);
//         userRank[0].push(score);
//     } else if(game === 'upDown_game') {
//         userRank[1].push(game);
//         userRank[1].push(record);
//         userRank[1].push(score);
//     } else if(game === 'MuChipa_game'){
//         userRank[2].push(game);
//         userRank[2].push(record);
//         userRank[2].push(score);
//     }
// }

export { recordNewRank, recordCurrentScore, detectGame, gStatus, currentScore, readUserHighScore };
