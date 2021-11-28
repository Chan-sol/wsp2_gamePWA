<template>
    <v-container class="page">
        <div class="imgContainer">
            <img class="logoImg" src="./loginImage/logo.png">
        </div>
        <div v-if="!fnGetAuthStatus" class="buttonContainer notLogin">
            <button @click="fnDoGoogleLogin_Popup" class="btn googleLogin">
                <v-icon left color="white">mdi-google</v-icon>Google Login
            </button>
            <button @click="fnEmailLoginPage" class="btn emailLogin">
                <v-icon left color="white">mdi-email</v-icon>Email Login
            </button>
            <hr color="#e6ebce" class="hr">
            <span class="des">Didn't you sign up yet?</span>
            <button @click="fnRegisterPage" class="btn emailRegister">
                <v-icon left color="black">mdi-pencil</v-icon>Email Register
            </button>
        </div>
        <div v-else class="buttonContainer Login">
            <button @click="fnGameSelectPage()" class="btn menu">
                <v-icon left color="black">sports_esports</v-icon>Game Menu
            </button>
            <button @click="fnDoLogout" class="btn logout">
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
        fnEmailLoginPage() {
            this.$router.push('/emailLogin')
        },
        fnRegisterPage() {
            this.$router.push('/emailRegister')
        },
        fnGameSelectPage() {
            this.$router.push('/gameSelect')
        }
    },
    computed: {
        fnGetLoading() {
            // 시간 지연 상태 스토어에서 읽어서 반환
            this.$store.getters.fnGetLoading;
        },
        fnGetAuthStatus() {
            return this.$store.getters.fnGetAuthStatus
        }
    }
}
</script>
<style scoped>
    @import url(https://fonts.googleapis.com/css?family=BenchNine:700);

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

    .buttonContainer {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    /* 로그인 안 했을 때 버튼들 */
    .googleLogin {
        background-color: #fe4063ce;
        color: white;
    }
    .emailLogin {
        background-color: #008080ce;
        color: white;
    }
    .emailRegister {
        background-color: #e6ebcece;
        color: rgb(34, 34, 34);
    }

    .btn {
        width: 35vh;
        border: none;
        cursor: pointer;
        display: inline-block;
        font-family: 'BenchNine', Arial, sans-serif;
        font-size: 22px;
        line-height: 1em;
        margin: 15px 40px;
        outline: none;
        padding: 12px 40px 10px;
        position: relative;
        text-transform: uppercase;
        font-weight: 700;
    }

    .btn:before,
    .btn:after {
        border-color: transparent;
        -webkit-transition: all 0.25s;
        transition: all 0.25s;
        border-style: solid;
        border-width: 0;
        content: "";
        height: 24px;
        position: absolute;
        width: 24px;
    }

    .btn:before {
        border-right-width: 2px;
        border-top-width: 2px;
        right: -5px;
        top: -5px;
    }

    .btn:after {
        border-bottom-width: 2px;
        border-left-width: 2px;
        bottom: -5px;
        left: -5px;
    }

    .googleLogin:before,
    .googleLogin:after {
        border-color: #fe4063;
    }
    .emailLogin:before,
    .emailLogin:after {
        border-color: #008080;
    }
    .emailRegister:before,
    .emailRegister:after {
        border-color: #e6ebce;
    }

    .googleLogin:hover {
        background-color: #fe406388;
    }
    .emailLogin:hover {
        background-color: #00808088;
    }
    .emailRegister:hover {
        background-color: #e6ebce88;
    }

    .btn:hover:before,
    .btn:hover:after {
        height: 100%;
        width: 100%;
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

    /* 로그인 했을 때 버튼들 */
    .menu {
        background-color: #e6ebcece;
        color: rgb(34, 34, 34);
    }
    .logout {
        background-color: #008080ce;
        color: white;
    }

    .menu:before,
    .menu:after {
        border-color: #e6ebce;
    }
    .logout:before,
    .logout:after {
        border-color: #008080;
    }

    .menu:hover {
        background-color: #e6ebce88;
    }
    .logout:hover {
        background-color: #00808088;
    }
</style>