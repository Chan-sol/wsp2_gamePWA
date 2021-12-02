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
                    <div class="puzzleGameRecord">Puzzle Game : </div>
                    <div class="upDownGameRecord">UpDown Game : {{ this.upDownScore }}</div>
                    <div class="mukChiPaGameRecord">MukChiPa Game : </div>
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
import { readUserHighScore } from "../ranking_components/ranking.js";

export default {
    data() {
        return {
            // puzzleScore: readUserHighScore('puzzle_game', this.fnGetUser.id),
            upDownScore: readUserHighScore('upDown_game', this.fnGetUser.id),
            // mukChiPaScore: readUserHighScore('mukChiPa_game', this.fnGetUser.id),
        }
    },
    computed: {
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

    .avatar_style {
        /* 사진 이미지 원 모양 */
        width: 15vmin;
        height: 15vmin;
        border-radius: 50%;
    }

    .welcome {
        font-family: 'Oswald', sans-serif;
        font-size: 10vmin;
        font-weight: bold;
        color: #e6ebce;
    }

    .page {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
</style>
<style src="../css/button.css"></style>