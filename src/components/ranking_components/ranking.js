import { squidDatabase } from "../../datasources/firebase"; 

let gStatus = [false, false, false];
function detectGame(puzzleGameStatus, upDownGameStatus, MukchipaGameStatus) {
    gStatus[0] = puzzleGameStatus;
    gStatus[1] = upDownGameStatus;
    gStatus[2] = MukchipaGameStatus;
}

function recordNewRank(game, userId, name, score) {
    squidDatabase.ref(game + '/' + userId).on('value', (snapshot) => {
        const userRecordData = snapshot.val();
        if(userRecordData === null ||userRecordData.user_score < score){
            squidDatabase.ref(game + '/' + userId).set({
                user_name: name,
                user_score: score
            });
        }
    });
}

export { recordNewRank, detectGame, gStatus };
