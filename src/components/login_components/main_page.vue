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
                <p>This is Ranking</p>
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
export default {
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

    /* border 템플릿 */
    .content h2{ font-size:19px; }

    .rankingBox{
        position: absolute;
        top: 42vh;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        height: 300px;
        background: #fe4063ce;
        box-sizing: border-box;
        overflow: hidden;
        box-shadow: 0 20px 50px #fe4063;
        border: 2px solid rgb(31, 31, 31);
        color: white;
        padding: 20px;
    }

    .rankingBox:before{
        content: '';
        position:absolute;
        top:0;
        left:-100%;
        width:100%;
        height:100%;
        background: #008080ce;
        transition:0.5s;
        pointer-events: none;
    }

    .rankingBox:hover:before{
        left:+50%;
        transform: skewX(-5deg);
    }


    .rankingBox .content{
        position:absolute;
        top:15px;
        left:15px;
        right:15px;
        bottom:15px;
        border:1px solid #e6ebce;
        padding:20px;
        text-align:center;
        box-shadow: 0 5px 10px rgba(9,0,0,0.5);
    }

    .rankingBox span{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: block;
        box-sizing: border-box;
    }

    .rankingBox span:nth-child(1)
    {
        transform:rotate(0deg);
    }

    .rankingBox span:nth-child(2)
    {
        transform:rotate(90deg);
    }

    .rankingBox span:nth-child(3)
    {
        transform:rotate(180deg);
    }

    .rankingBox span:nth-child(4)
    {
        transform:rotate(270deg);
    }

    .rankingBox span:before
    {
        content: '';
        position: absolute;
        width:100%;
        height: 2px;
        background: white;
        animation: animate 4s linear infinite;
    }

    @keyframes animate {
        0% {
            transform:scaleX(0);
            transform-origin: left;
        }
        50%
        {
            transform:scaleX(1);
            transform-origin: left;
        }
        50.1%
        {
            transform:scaleX(1);
            transform-origin: right;
            
        }
        100%
        {
            transform:scaleX(0);
            transform-origin: right;
            
        }
    }
</style>
<style src="../css/button.css"></style>