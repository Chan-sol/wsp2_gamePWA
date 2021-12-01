<template>
    <div id = "bgcloud">
        <div id = "computer" :style="computedStyleObject" ></div>
        <div>
            <img v-for="l in life" v-bind:key="l.id"
            :src="lifeurl" />
            <img v-for="d in dead" v-bind:key="d.id"
            :src="deadurl" />
        </div>
        <p id = "result">{{result}}</p>
        <p id = "nowscore">현재 {{score}}점</p> 
        <div id = "btn">
            <button id = "ro" v-on:click="onClickButton('바위')"></button>
            <button id = "si" v-on:click="onClickButton('가위')"></button>
            <button id = "pa" v-on:click="onClickButton('보')"></button> 
        </div>  
    </div>
</template>

<script>
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
    let moksum = 3;
    export default {
        data(){
            return{
                imgCoord: rspCoords.바위,
                result: '게임을 시작하세요!',
                score: 0,
                life: 3,
                dead: 0,
                lifeurl: require("./gameAssets/mukchipa/dalgona.png"),
                deadurl: require("./gameAssets/mukchipa/brokendalgona.png"),
            };
        },
        computed:{
            computedStyleObject(){
                return {
                    background: `url(./gameAssets/mukchipa/rfinalojing.png) ${this.imgCoord} 0`
                };
            }
        },
        methods: {
            changeHand(){
                interval = setInterval(() =>{
                if(this.imgCoord === rspCoords.바위){
                    this.imgCoord = rspCoords.가위;
                }else if (this.imgCoord === rspCoords.가위){
                    this.imgCoord = rspCoords.보;
                }else if (this.imgCoord === rspCoords.보){
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
                        this.result = '비겼네요. 한번 더!';
                        setTimeout(() =>{
                            this.changeHand();
                        }, 1000);
                    }else if ([-1,2].includes(diff)){
                        this.result = '이겼습니다 주도권은 내가!';
                        leader = 1;
                        setTimeout(() =>{
                            this.changeHand();
                        }, 2000);
                    }else{
                        this.result = '졌습니다 주도권은 컴퓨터가!';
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
                            this.result = "최종 승리! 3초 뒤에 새 게임이 시작됩니다";
                            this.score += 10;
                            leader = 0;
                            setTimeout(() =>{
                                this.changeHand();
                            }, 3000);
                        }else if([-1,2].includes(finalresult)){
                            this.result = "한번 더!";
                            setTimeout(() =>{
                                this.changeHand();
                            }, 1000);
                        }else{
                            this.result = "주도권을 뺏겼어요!";
                            leader=2;
                            setTimeout(() =>{
                                this.changeHand();
                            }, 1000);
                        }
                    }else if(leader ===2){
                        if(finalresult===0){
                            if(moksum === 0){
                                clearInterval(interval);
                                alert('GAME OVER!! 다시 시작하겠습니까?');
                                location.reload();
                            }
                            else{
                                this.result = "졌어요! 3초 뒤에 새 게임이 시작됩니다";
                                this.life -= 1;
                                this.dead += 1;
                                leader = 0;
                                moksum -= 1;
                                setTimeout(() =>{
                                    this.changeHand();
                                }, 3000);
                            }
                        }else if([-1,2].includes(finalresult)){
                            this.result = "주도권을 되찾았어요!";
                            leader = 1;
                            setTimeout(() =>{
                                this.changeHand();
                            }, 1000);
                        }else{
                            this.result = "한번 더!";
                            setTimeout(() =>{
                                this.changeHand();
                            }, 1000);
                        }
                    }
                }
            },
        },
        mounted(){
            this.changeHand();
        },
        beforeDestroy(){
            clearInterval(interval);
        },
    };
</script>

<style scoped>
@import "./gameCss/seohyeon_game.css";
</style>