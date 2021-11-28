<template>

<div class="background">
<meta name="viewport" content="width=device-width,initial-scale=1">
    <v-container>
    <img :src="logo"
    class="ForLogo" />
    
    <div class="row">
         <div class="small-6 columns text-center">
             <div style="max-width:350px">
                 <img v-for="l in life" v-bind:key="l.id"
                 :src="imgurl"
                 style="width: 20%" />
             </div>
         </div>
    </div>

        <h1>{{result}}</h1>
        <form v-on:submit="onSubmitForm">
            <input ref="answer" type="text" id="enter" maxlength="4" v-model="value" >
            <button type="submit" id="btn">Type</button>
        </form>
        <h3 style="margin-top: 20px"> Tries </h3>
        <div id="try">{{tries.length}}</div>
        <ul>
            <li v-for="t in tries" v-bind:key="t.id">
                <div id="bold">{{t.try}}</div>
                <div>{{t.result}}</div>
                </li>
            </ul>
            </v-container>
        </div>
</template>

<script>
export default {
    data() {
        return {
            answer: Math.floor(Math.random()*100), // 0~100 range random number is generated
            tries: [],
            value: '',
            result: '',
            id: '',
            life: 5, // initial chances
            score: 100, // initial score is 100
            imgurl: require("./gameAssets/Updown/images/umbrella_gray.jpg"),
            logo: require("./gameAssets/Updown/images/logo_gray.jpg")
        }
    },
    methods: {
        onSubmitForm(e) {
            e.preventDefault();
            console.log(this.answer);
            let temp = 0;

            if (this.life == 0) { // game end, User lose
                alert(`Game over! your score is 0, the answer was ${this.answer}`);
                this.answer = Math.floor(Math.random()*100);
                this.score = 100;
                this.life = 5;
                this.tries = [];
                this.value = '';
                this.id = 0;
                this.$refs.answer.focus();
                }
            if (this.value == this.answer) { //Correct answer, User win
                temp = this.score;
                this.tries.push({
                    try: this.value,
                    result: `You win! your score is ${temp}`,
                    id: this.id++
                    });
                //this.result = "You win!";
                alert(`You win! your score is ${temp}`);
                this.answer = Math.floor(Math.random()*100);
                this.score = 100;
                this.life = 5;
                this.tries = [];
                this.value = '';
                this.id = 0;
                this.$refs.answer.focus();
                } 
            if (this.value == '') { // No input. error message
                this.tries.push({
                    try: this.value,
                    result: `No input! Type any number. Current score is ${this.score}`,
                    id: this.id++
                })
            } else { // input is a number at least 0
                if (this.value < this.answer) { //prediction is incorrect
                    this.score -= 20;
                    this.life --;
                    temp=this.score;
                    this.tries.push({
                        try: this.value,
                        result: `${this.value} is too small! your score is ${temp}`,
                        id: this.id++,
                        });
                    this.value = '';
                    this.$refs.answer.focus();
                    }
                if (this.value > this.answer) { // prediction is incorrect
                    this.score -= 20;
                    this.life--;
                    temp=this.score;
                    this.tries.push({
                        try: this.value,
                        result: `${this.value} is too big! your score is ${temp}`,
                        id: this.id++,
                        });
                    this.value = '';
                    this.$refs.answer.focus();
                    }
            }
            
        }
    }
};
</script>

<style>
@import "./gameCss/Updown_game.css";
</style>
