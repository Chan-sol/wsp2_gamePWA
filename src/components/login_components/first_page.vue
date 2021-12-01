<template>
    <v-container class="page">
        <div class="imgContainer">
            <img class="logoImg" src="./loginImage/logo.png">
        </div>
        <div v-if="!fnGetAuthStatus" class="buttonContainer notLogin">
            <button @click="fnDoGoogleLogin_Popup" class="btn squidRed">
                <v-icon left color="white">mdi-google</v-icon>Google Login
            </button>
            <button @click="fnEmailLoginPage" class="btn squidGreen">
                <v-icon left color="white">mdi-email</v-icon>Email Login
            </button>
            <hr color="#e6ebce" class="hr">
            <span class="des">Didn't you sign up yet?</span>
            <button @click="fnRegisterPage" class="btn squidWhite">
                <v-icon left color="black">mdi-pencil</v-icon>Email Register
            </button>
        </div>
        <div v-else class="buttonContainer Login">
            <button @click="fnMainPage()" class="btn squidRed">
                <v-icon left color="white">mdi-home</v-icon>Main Page
            </button>
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
export default {
    methods: {
        fnDoGoogleLogin_Popup() {
            // 스토어에 구글 계정 로그인 처리 요청
            this.$store.dispatch("fnDoGoogleLogin_Popup"); // actions에 정의되어 있으므로 dispatch() 함수를 사용해 실행
        },
        fnDoLogout() {
            this.$store.dispatch('fnDoLogout')
        },
        fnEmailLoginPage() {
            this.$router.push('/emailLogin')
        },
        fnRegisterPage() {
            this.$router.push('/emailRegister')
        },
        fnMainPage() {
            this.$router.push('/main')
        },
        fnGameSelectPage() {
            this.$router.push('/gameSelect')
        }
    },
    computed: {
        fnGetAuthStatus() {
            return this.$store.getters.fnGetAuthStatus
        }
    }
}
</script>
<style scoped>
    @keyframes logoAnimation {
        from {
            opacity:1;
            width: 86.4vmin;
            height: 41.64vmin;
        }
        to {
            opacity:0.5;
            width: 79.2vmin;
            height: 38.17vmin;
        }
    }

    .page {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .imgContainer {
        width: 100%;
        height: 25vmax;
        display: flex;
        justify-content: center;
    }

    .logoImg {
        animation-name: logoAnimation;
        animation-duration: 3s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }
    
    .hr {
        width: 350px;
        margin-top: 40px;
        opacity: 0.5;
    }
    
    .des {
        font-size: 15px;
        color: #e6ebce;
        margin-top: 10px;
        margin-bottom: 30px;
    }
</style>
<style src="../css/button.css"></style>