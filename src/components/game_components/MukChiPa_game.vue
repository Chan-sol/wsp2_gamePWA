<template>
    <div id = "bgcloud">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <v-container fill-height fluid>
        <v-col justify="center" align ="center">
        <div style = "max-width:313px">
            <img v-for="l in life" v-bind:key="l.id"
            :src="lifeurl" 
            style="width:20%"/>
            <img v-for="d in dead" v-bind:key="d.id"
            :src="deadurl"
            style="width:20%" />
        </div>
        <p id = "result">{{result}} <br><span id = "accent">SCORE: {{score}}</span></p>
        <div id = "computer" class="rock"></div> 
        <div id = "btn" style ="max-width:400px">
            <button id = "ro" v-on:click="onClickButton('바위')"></button>
            <button id = "si" v-on:click="onClickButton('가위')"></button>
            <button id = "pa" v-on:click="onClickButton('보')"></button> 
        </div>
        </v-col>
    </v-container> 
    </div>
</template>

<script>
import * as rMod from "../ranking_components/ranking";

    const rspCoords = {
        바위: '0',
        가위: '-313px',
        보: '-626px',
    };
    const scores = {
        가위: 1,
        바위: 0,
        보: -1,
    };
    const computerChoice = (imgCoord) => {
        return Object.entries(rspCoords).find(function(v){
            return v[1] === imgCoord;
        })[0];
    };

    let interval = null;
    let leader = 0;
    let moksum = 5;
    export default {
        data(){
            return{
                imgCoord: rspCoords.바위,
                result: 'Start the GAME!',
                score: 0,
                life: 5,
                dead: 0,
                lifeurl: require("./gameAssets/MukChiPa/dalgona.png"),
                deadurl: require("./gameAssets/MukChiPa/brokendalgona.png"),
            };
        },
        methods: {
            changeHand(){
                interval = setInterval(() =>{
                if(this.imgCoord === rspCoords.바위){
                    document.getElementById('computer').className = 'scissors';
                    this.imgCoord = rspCoords.가위;
                }else if (this.imgCoord === rspCoords.가위){
                    document.getElementById('computer').className = 'paper';
                    this.imgCoord = rspCoords.보;
                }else if (this.imgCoord === rspCoords.보){
                    document.getElementById('computer').className = 'rock';
                    this.imgCoord = rspCoords.바위;
                }
            }, 100);
            },
            onClickButton(choice){
                if(leader === 0){
                    clearInterval(interval);
                    const myScore = scores[choice];
                    const cpuScore = scores[computerChoice(this.imgCoord)];
                    const diff = myScore - cpuScore;
                    if (diff === 0){
                        this.result = 'One more time';
                        setTimeout(() =>{
                            this.changeHand();
                        }, 1000);
                    }else if ([-1,2].includes(diff)){
                        this.result = 'You are the leader';
                        leader = 1;
                        setTimeout(() =>{
                            this.changeHand();
                        }, 2000);
                    }else{
                        this.result = '영희 is the leader';
                        leader =2;
                        setTimeout(() =>{
                            this.changeHand();
                        }, 2000);
                    }
                }else if(leader===1||leader===2){
                    clearInterval(interval);
                    const myScore2 = scores[choice];
                    const cpuScore2 = scores[computerChoice(this.imgCoord)];
                    const finalresult = myScore2 - cpuScore2;
                    if(leader ===1){
                        if(finalresult===0){
                            this.result = "<WIN!!> A new game will start in 3 seconds";
                            this.score += 10;
                            leader = 0;
                            setTimeout(() =>{
                                this.changeHand();
                            }, 3000);
                        }else if([-1,2].includes(finalresult)){
                            this.result = "One more time!";
                            setTimeout(() =>{
                                this.changeHand();
                            }, 1000);
                        }else{
                            this.result = "Change the leader (YOU->영희)";
                            leader=2;
                            setTimeout(() =>{
                                this.changeHand();
                            }, 1000);
                        }
                    }else if(leader ===2){
                        if(finalresult===0){
                            moksum -= 1;
                            this.life -= 1;
                            this.dead += 1;
                            if(moksum <= 0){
                                // ranking 기록
                                console.log('게임 끝');
                                if(this.fnGetAuthStatus) {
                                    rMod.recordNewRank('MukChiPa_game', this.fnGetUser.id, this.fnGetUser.name, this.score);
                                    console.log('기록 끝');
                                } else {
                                    rMod.recordCurrentScore(this.score);
                                }
                                clearInterval(interval);
                                // location.reload();
                                rMod.detectGame(false, false, true);
                                console.log('랭킹페이지로');
                                setTimeout(() =>{
                                    alert('GAME OVER!!');
                                    this.$router.push('/rankingPage');
                                }, 2000);
                            }
                            else{
                                console.log(moksum);
                                this.result = "<LOSE!!> A new game will start in 3 seconds";
                                leader = 0;
                                setTimeout(() =>{
                                    this.changeHand();
                                }, 3000);
                            }
                        }else if([-1,2].includes(finalresult)){
                            this.result = "Change the leader (영희->YOU)";
                            leader = 1;
                            setTimeout(() =>{
                                this.changeHand();
                            }, 1000);
                        }else{
                            this.result = "One more time!";
                            setTimeout(() =>{
                                this.changeHand();
                            }, 1000);
                        }
                    }
                }
            },
        },
        computed: {
            fnGetAuthStatus() {
                return this.$store.getters.fnGetAuthStatus
            },
            fnGetUser() {
                let oUserInfo = this.$store.getters.fnGetUser;
                return oUserInfo;
            }
        },
        mounted(){
            this.changeHand();
        },
        beforeDestroy(){
            clearInterval(interval);
        },
    };
</script>

<style src="./gameCss/MukChiPa_game.css" scoped></style>