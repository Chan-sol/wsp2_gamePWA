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
                    </li> 
                </ul>
            </div>
        </div>
        <div class="buttonsContainer">
            <div class="buttonContainer">
                <button v-if="fnGetAuthStatus && this.rankingBtnClick === false" @click="fnRankingData" class="buttons squidRed">
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
                userHighScore: '',
                userCurrentScore: rMod.currentScore,
                showRankingData: [],
                restartPath: '/puzzle',
                rankingBtnClick: false,
            }
        } else if(rMod.gStatus.indexOf(true) === 1){
            return {
                title: 'UpDown Game Rank',
                currentGame: 'upDown_game',
                userRecord: 0,
                userHighScore: '',
                userCurrentScore: rMod.currentScore,
                showRankingData: [],
                restartPath: '/Updown',
                rankingBtnClick: false,
            }
        } else {
            return {
                title: 'MukChiPa Game Rank',
                currentGame: 'MukChiPa_game',
                userRecord: 0,
                userHighScore: '',
                userCurrentScore: rMod.currentScore,
                showRankingData: [],
                restartPath: '/MukChiPa',
                rankingBtnClick: false,
            }
        }
    },
    created() {
        if(!this.fnGetAuthStatus){
            // 오프라인 version
            return;
        }
        const gameRanking = rMod.makeGameRanking(this.currentGame); // no medal
        const gameMedalRanking = rMod.addMedalToRanking(gameRanking);
        const gameUserRank = rMod.userRank(gameMedalRanking, this.fnGetUser.name);
        this.userRecord = gameUserRank[0];
        this.userHighScore = gameUserRank[1];
        console.log(this.userRecord);
        console.log(this.userHighScore);
        this.showRankingData = rMod.showRankingTop10(gameMedalRanking)
    },
    methods: {
        fnRankingData() {
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

    .medal, .name, .score {
        font-size: 12px;
    }

    .name {
        color: rgb(34, 34, 34);
        margin-right: 50px;
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
