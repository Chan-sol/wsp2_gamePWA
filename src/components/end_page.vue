<template>
    <v-container>
        <div class="container">
        <div class="word">
            <span>G</span>
            <span>A</span>
            <span>M</span>
            <span>E</span>
            <span>O</span>
            <span>V</span>
            <span>E</span>
            <span>R</span>
        </div>
        <img src="../assets/Image/younghee.gif" id="bg-video">
        </div>
    </v-container>
</template>
<script>
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.container{
    position: fixed;
    height: 100vh;
}
#bg-video{
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    z-index:-999;
}
.word{
    width: 100%;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    text-align: center;
}

.word span{
    display: inline-block;
    font-size: 9vw;
    color: #fe4063;
    font-family: 'Fredoka One', cursive;
    font-weight: 700;
    letter-spacing: 3vw;
    text-shadow: 0 15px 25px rgba(0,0,0,0.2);
    position: relative;
    transform: translateY(-100vh);
    animation: fall 2.8s forwards;
}

@media (min-width: 1000px){
    .word{margin-left: 15%;}
}

 @keyframes fall{
    100%{
        transform: translateY(0);
    }
 }
.word span:nth-child(2){
    animation-delay: 0.4s;
}
.word span:nth-child(3){
    animation-delay: 0.8s;
}
.word span:nth-child(4){
    animation-delay: 1.2s;
}
.word span:nth-child(5){
    animation-delay: 1.6s;
}
.word span:nth-child(6){
    animation-delay: 2.0s;
}
.word span:nth-child(7){
    animation-delay: 2.4s;
}
.word span:nth-child(8){
    animation-delay: 2.8s;
}
</style>