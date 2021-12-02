<template>
    <v-container>
        <div v-if="fnGetAuthStatus" class="rankingContainer">
            <div class="rankingTitle">
                <h1>{{ this.title }}</h1>
                <v-list v-model="showRankingData">
                <v-list-item v-for="(item, i) in this.showRankingData[0]" :key="i">
                    <v-list-content>
                        순위 : {{ item[0] }} /
                        이름 : {{ item[2] }} /
                        점수 : {{ item[4] }} /
                    </v-list-content>
                </v-list-item>
            </v-list>
            </div>
            <div class="ranking">
                <button @click="fnUserGameData">Make rankingData</button>
            </div>
        </div>
        <div class="buttonContainer">
        </div>
    </v-container>
</template>
<script>
import { squidDatabase } from "../../datasources/firebase"; 
import * as rMod from "../ranking_components/ranking.js";

let rank = [];
export default {
    data() {
        if(rMod.gStatus.indexOf(true) === 0){ // 0 : 퍼즐, 1 : 업다운, 2 : 묵찌빠
            return {
                title: 'Puzzle Game Ranking',
                currentGame: 'puzzle_game',
                userRecord: 0,
                userHighScore: '',
                showRankingData: [],
                restartPath: '/puzzle',
            }
        } else if(rMod.gStatus.indexOf(true) === 1){
            return {
                title: 'UpDown Game Ranking',
                currentGame: 'upDown_game',
                userRecord: 0,
                userHighScore: '',
                showRankingData: [],
                restartPath: '/Updown',
            }
        } else {
            return {
                title: 'Mukchipa Game Ranking',
                currentGame: 'MukChipa_game',
                userRecord: 0,
                userHighScore: '',
                rankingData: [],
                restartPath: '/MukChipa',
            }
        }
    },
    created() {
        if(!this.fnGetAuthStatus){
            // 오프라인 version
            return;
        }
        // ranking 저장 (오름차순 or 내림차순)
        squidDatabase.ref(this.currentGame + '/').orderByChild('user_score').on('child_added', (snapshot) => {
            // Object.entries(객체) : 객체를 배열로 변환
            const oneUserRecordArr2 = Object.entries(snapshot.val()); // 2차원
            const oneUserRecordArr1 = oneUserRecordArr2[0].concat(oneUserRecordArr2[1]); // 1차원

            this.currentGame === 'puzzle_game' ? rank.push(oneUserRecordArr1) : rank.unshift(oneUserRecordArr1);
            // 오름차순 순위면 앞으로 쌓기 (unshift) => upDown, Mukchipa
            // 내림차순 순위면 뒤로 쌓기 (push) => puzzle
        });
    },
    methods: {
        fnUserGameData() {
            console.log(rank);
            // medal(순위)[index: 0] 추가
            // userRecord, user_score 저장
            let numOfEqual = 0;
            let medal = 1;
            rank[0].unshift(1);
            for(let i=1; i<=rank.length; i++){
                if(rank[i][3] === rank[i-1][3]){
                    // rank[i][3] : user_score, rank[i-1][3] : previous_user_score
                    // 즉, 동점인 상황
                    numOfEqual++;
                    rank[i].unshift(medal);
                } else {
                    // 점수가 달라짐
                    medal = medal + ( numOfEqual + 1 );
                    rank[i].unshift(medal);
                    numOfEqual = 0;
                }
                this.userRecord = rank[i-1][0]; // medal
                this.userHighScore = rank[i-1][4]; // user_score
            }

            console.log('fnUserGameData 끝');
            console.log(this.currentGame);
            console.log(this.userRecord);
            console.log(this.userHighScore);

            for(let j=0; j<10; j++){
                // 상위 10명 까지만
                this.showRankingData.push(rank[j])
            }
        }
    },
    computed: {
        fnGetAuthStatus() {
            return this.$store.getters.fnGetAuthStatus;
        },
        fnGetUser() {
            let oUserInfo = this.$store.getters.fnGetUser;
            return oUserInfo;
        },
    },
}
</script>
