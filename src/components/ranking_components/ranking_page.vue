<template>
    <v-container class="page">
        <div class="textContainer">
            <div class="rankingTitle">{{ this.title }}</div>
            <div class="userRank" v-if="fnGetAuthStatus && this.rankingBtnClick === true">
                Your <span class="userRecord">Record</span> / <span class="userScore">Score</span> :
                Top <span class="userRecord">{{ this.userRecord }} </span> / <span class="userScore">{{ this.userHighScore }}</span>
            </div>
            <div v-if="this.rankingBtnClick === false" class="currentScore">
                score
                <span class="userCurrentScore">{{ this.userCurrentScore }}</span>
            </div>
        </div>
        <div v-if="fnGetAuthStatus && this.rankingBtnClick === true" class="rankingBox">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <div class="rank">
                <ul v-for="(item, i) in this.showRankingData" :key="i">
                    <li>
                        <div class="medal">
                            Top {{ item[0] }}
                        </div>
                        <div class="name">
                            {{ item[2] }}
                        </div>
                        <div class="score">
                            {{ item[4] }}
                        </div>
                        <!-- {{ item[0] }} 위 {{ item[2] }} {{ item[4] }} -->
                    </li> 
                </ul>
            </div>
        </div>
        <div class="buttonsContainer">
            <div class="buttonContainer">
                <!-- ranking button은 한 번만 누를 수 있게 v-if를 써버리자~! -->
                <button v-if="fnGetAuthStatus && this.rankingBtnClick === false" @click="fnUserGameData" class="buttons squidRed">
                    <v-icon color="white" class="mr-1">star_half</v-icon>Ranking
                </button>
                <button @click="fnRestart()" class="buttons squidGreen">
                    <v-icon color="white" class="mr-1">restart_alt</v-icon>Restart
                </button>
            </div>
            <div class="buttonContainer">
                <button @click="fnGameSelectPage()" class="buttons squidWhite">
                    <v-icon color="black" class="mr-1">mdi-menu</v-icon>Game Menu
                </button>
                <button @click="fnEndPage()" class="buttons squidRed">
                    <v-icon color="white" class="mr-2">waving_hand</v-icon>EXIT
                </button>
            </div>
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
                title: 'Puzzle Game Rank',
                currentGame: 'puzzle_game',
                userRecord: 0,
                userCurrentScore: rMod.currentScore,
                userHighScore: '',
                showRankingData: [],
                restartPath: '/puzzle',
                rankingBtnClick: false,
            }
        } else if(rMod.gStatus.indexOf(true) === 1){
            return {
                title: 'UpDown Game Rank',
                currentGame: 'upDown_game',
                userRecord: 0,
                userCurrentScore: rMod.currentScore,
                userHighScore: '',
                showRankingData: [],
                restartPath: '/Updown',
                rankingBtnClick: false,
            }
        } else {
            return {
                title: 'Mukchipa Game Rank',
                currentGame: 'MukChipa_game',
                userRecord: 0,
                userCurrentScore: rMod.currentScore,
                userHighScore: '',
                rankingData: [],
                restartPath: '/MukChipa',
                rankingBtnClick: false,
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
            // medal(순위)[index: 0] 추가
            // userRecord, user_score 저장
            let numOfEqual = 0;
            let medal = 1;
            rank[0].unshift(1);
            for(let i=1; i<rank.length; i++){
                if(rank[i][3] === rank[i-1][4]){
                    // rank[i][3] : user_score, rank[i-1][4] : previous_user_score
                    // 즉, 동점인 상황
                    numOfEqual++;
                    rank[i].unshift(medal);
                } else {
                    // 점수가 달라짐
                    medal = medal + ( numOfEqual + 1 );
                    rank[i].unshift(medal);
                    numOfEqual = 0;
                }
            }

            for(let i=0; i<rank.length-1; i++){
                if(rank[i][2] === this.fnGetUser.name){
                    this.userRecord = rank[i][0]; // medal
                    this.userHighScore = rank[i][4]; // user_score
                    break;
                }
            }

            this.showRankingData = rank.length > 10 ? rank.slice(0, 10) : rank.slice(0, rank.length);
            this.rankingBtnClick = true;
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
        fnRestart() {
            this.$router.push(this.restartPath);
        },
        fnGameSelectPage() {
            this.$router.push('/gameSelect')
        },
        fnEndPage() {
            this.$router.push('/end')
        }
    },
}
</script>
<style src="../css/button.css"></style>
<style src="../css/rankingBox.css"></style>
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');
    @keyframes textAnimation {
        0% {
            color: #fe4063;
        }
        33% {
            color: #e6ebce;
        }
        66% {
            color: #008080;
        }
        100% {
            color: #fe4063;
        }
    }

    .page, .buttonsContainer {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    /* ranking css */
    .rankingBox {
        top: 41vh;
    }

    .rank {
        position:absolute;
        top:15px;
        left:15px;
        right:15px;
        bottom:15px;
        border:1px solid #e6ebce;
    }

    ul{
        list-style:none;
        padding-left:5px;
        padding-top:2px;
        font-size: 10px;
        text-align: center;
    }

    li {
        width: 100%;
    }

    .medal, .name, .score {
        display: inline;
        margin-right: 3px;
    }

    .medal {
        font-size: 12px;
    }

    .name {
        color: rgb(34, 34, 34);
        margin-right: 50px;
    }

    .score {
        font-size: 12px;
    }

    .userRecord {
        color: #fe4063;
    }

    .userScore {
        color: #008080;
    }

    .rankingTitle {
        font-family: 'Oswald', sans-serif;
        font-size: 8vmin;
        color: #e6ebce;
        text-align: center;
        margin-bottom: 30px;
        animation-name: textAnimation;
        animation-duration: 3s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }

    .currentScore {
        font-family: 'Oswald', sans-serif;
        font-size: 10vmin;
        color: #585858;
        text-align: center;
    }

    .userCurrentScore {
        color: #e6ebce;
        font-size: 15vmin;
    }

    .userRank {
        color: white;
        text-align: center;
    }

    /* button css */
    .buttonsContainer {
        height: 35%;
        justify-content: center;
    }

    .buttonContainer {
        width: 100%;
        height: 30%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }


    .buttons {
        width: 40vmin;
        border: none;
        cursor: pointer;
        display: inline-block;
        font-family: 'BenchNine', Arial, sans-serif;
        font-size: 18px;
        line-height: 1em;
        margin: 15px 20px;
        outline: none;
        padding: 12px 12px 10px;
        position: relative;
        text-transform: uppercase;
        font-weight: 700;
    }

    .buttons:before,
    .buttons:after {
        -webkit-transition: all 0.25s;
        transition: all 0.25s;
        border-style: solid;
        border-width: 0;
        content: "";
        height: 24px;
        position: absolute;
        width: 24px;
    }

    .buttons:before {
        border-right-width: 2px;
        border-top-width: 2px;
        right: -5px;
        top: -5px;
    }

    .buttons:after {
        border-bottom-width: 2px;
        border-left-width: 2px;
        bottom: -5px;
        left: -5px;
    }

    .buttons:hover:before,
    .buttons:hover:after {
        height: 100%;
        width: 100%;
    }
</style>
