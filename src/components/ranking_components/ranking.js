import { squidDatabase } from "../../datasources/firebase"; 

function writeUserGameData(game, userId, name, score) {
    squidDatabase.ref(game + '/' + userId).set({
        user_name: name,
        user_score: score
    });
}

export { writeUserGameData };