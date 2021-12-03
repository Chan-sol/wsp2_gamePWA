<!-- 로그인 후 메인 화면을 표시 -->
<template>
    <v-container class="page">
        <div class="welcome mt-5">
            Welcome to S<b>Q</b>UID G<b>A</b>M<b>E</b>
        </div>
        <div class="rankingBox">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <div class="content">
                <h2>Your Ranking Status</h2>
                <div class="yourGameRecord">
                    <div class="puzzleGameRecord mb-5">Puzzle Game : </div>
                    <div class="upDownGameRecord mb-5">
                        <div class="gameName">
                            [ UpDown Game ]
                        </div>
                        Top 
                        <div class="record">
                            {{ this.upDownUserRank[0] }}
                        </div>
                         / Score 
                        <div class="score">
                            {{ this.upDownUserRank[1] }}
                        </div>
                    </div>
                    <div class="mukChiPaGameRecord">
                        <div class="gameName">
                            [ MukChiPa Game ]
                        </div>
                        Top 
                        <div class="record">
                            {{ this.mukChiPaUserRank[0] }}
                        </div>
                         / Score 
                        <div class="score">
                            {{ this.mukChiPaUserRank[1] }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="buttonContainer mb-5">
            <button @click="fnGameSelectPage()" class="btn squidWhite">
                <v-icon left color="black">sports_esports</v-icon>Game Menu
            </button>
            <button @click="fnDoLogout" class="btn squidGreen">
                <v-icon left color="white">mdi-login</v-icon>Logout
            </button>
        </div>
    </v-container>
</template>
<script>
import { makeGameRanking, addMedalToRanking, userRank } from "../ranking_components/ranking.js";

export default {
    data() {
        return {
            puzzleUserRank: [],
            upDownUserRank: [],
            mukChiPaUserRank: [],
        }
    },
    created() {
        if(!this.fnGetAuthStatus){
            // 오프라인 version
            return;
        }
        const upDownGameRanking = makeGameRanking('upDown_game'); // no medal
        const upDownGameMedalRanking = addMedalToRanking(upDownGameRanking);
        const upDownGameUserRank = userRank(upDownGameMedalRanking, this.fnGetUser.name);
        this.upDownUserRank = upDownGameUserRank;

        const mukChiPaGameRanking = makeGameRanking('MukChiPa_game'); // no medal
        const mukChiPaGameMedalRanking = addMedalToRanking(mukChiPaGameRanking);
        const mukChiPaGameUserRank = userRank(mukChiPaGameMedalRanking, this.fnGetUser.name);
        this.mukChiPaUserRank = mukChiPaGameUserRank;
    },
    computed: {
        fnGetAuthStatus() {
            return this.$store.getters.fnGetAuthStatus;
        },
        // 스토어에서 로그인된 계정 정보 반환
        fnGetUser() {
            let oUserInfo = this.$store.getters.fnGetUser;
            return oUserInfo;
        },
        fnGameSelectPage() {
            this.$router.push('/gameSelect')
        }
    },
    methods: {
        // 스토어의 로그아웃 기능 사용
        fnDoLogout() {
            this.$store.dispatch('fnDoLogout')
        }
    },
}
</script>
<style src="../css/rankingBox.css"></style>
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');
    .page {
        width: 100%;
        height: 95%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .welcome {
        font-family: 'Oswald', sans-serif;
        font-size: 10vmin;
        font-weight: bold;
        color: #e6ebce;
    }

    h2 {
        color: #e6ebce;
    }

    .gameName {
        font-size: 18px;
        font-weight: bold;
        color: #000000;
    }

    .record, .score {
        display: inline;
        font-size: 18px;
        font-weight: bold;
        color: #000000;
    }
</style>
<style src="../css/button.css"></style>