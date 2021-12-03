import { squidDatabase } from "../../datasources/firebase"; 

let gStatus = [false, false, false];
let currentScore = 0;

// game page에서 ranking으로 넘어갈 때 이용
function detectGame(puzzleGameStatus, upDownGameStatus, MukChiPaGameStatus) {
    gStatus[0] = puzzleGameStatus;
    gStatus[1] = upDownGameStatus;
    gStatus[2] = MukChiPaGameStatus;
}

// online.ver 기록
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

// offline ver. 기록
function recordCurrentScore(score) {
    currentScore = score;
}

// user_score 값을 기준(오름차순 or 내림차순)으로 ranking data 생성
function makeGameRanking(game) {
    let gameRanking = [];
    squidDatabase.ref(game + '/').orderByChild('user_score').on('child_added', (snapshot) => {
        // Object.entries(객체) : 객체를 배열로 변환
        const userRecordArr2 = Object.entries(snapshot.val()); // 2차원
        const userRecordArr1 = userRecordArr2[0].concat(userRecordArr2[1]); // 1차원
        
        game === 'puzzle_game' ? gameRanking.push(userRecordArr1) : gameRanking.unshift(userRecordArr1);
        // 오름차순 순위면 앞으로 쌓기 (unshift) => upDown, Mukchipa
        // 내림차순 순위면 뒤로 쌓기 (push) => puzzle
    });
    
    return gameRanking;
}

// ranking에 medal(순위) 추가
function addMedalToRanking(ranking) {
    // medal(순위)[index: 0] 추가
    // userRecord, user_score 저장
    let numOfEqual = 0; // 몇명이 동점인지
    let medal = 1;
    ranking[0].unshift(1);
    console.log(ranking);
    for(let i=1; i<ranking.length; i++){
        if(ranking[i][3] === ranking[i-1][4]){
            // ranking[i][3] : user_score, ranking[i-1][4] : previous_user_score
            // 즉, 동점인 상황
            numOfEqual++;
            ranking[i].unshift(medal);
        } else {
            // 점수가 달라짐
            medal = medal + ( numOfEqual + 1 );
            ranking[i].unshift(medal);
            numOfEqual = 0;
        }
    }
    
    return ranking;
}

// 상위 10명만 나열
function showRankingTop10(ranking) {
    let showRankingData = [];
    showRankingData = ranking.length > 10 ? ranking.slice(0, 10) : ranking.slice(0, ranking.length);

    return showRankingData;
}

// user 순위
function userRank(ranking, name) {
    let userRank = []; // userRank[0] : medal, userRank[1] : score
    for(let i=0; i<ranking.length; i++){
        if(ranking[i][2] === name){
            userRank.push(ranking[i][0]); // medal
            userRank.push(ranking[i][4]); // score
            break;
        }
    }

    return userRank;
}

export { detectGame, recordNewRank, recordCurrentScore, gStatus, currentScore, 
    makeGameRanking, addMedalToRanking, showRankingTop10, userRank };