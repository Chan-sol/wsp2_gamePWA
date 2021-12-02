<template>
<v-container>
    <div>
        <div class="top10">
            <v-list v-model="this.ranking">
                <v-list-item v-for="(item, i) in this.ranking" :key="i">
                    <v-list-content>
                        순위 : {{ item[0] }} <br>
                        이름 : {{ item[2] }} <br>
                        점수 : {{ item[4] }} <br>
                    </v-list-content>
                </v-list-item>
            </v-list>
        </div>
        <div class="userRecord">
            Your record : {{ this.userHighScore }} ({{ this.userRecord }} 위)
        </div>
    </div>
</v-container>
</template>
<script>
import data from "../ranking_components/ranking_page.vue";

export default {
    data() {
        return {
            ranking: data.data().currentGame,
            userRecord: data.userRecord,
            userHighScore: data.userHighScore
        }
    }
}

console.log(data);
console.log(data.data());
console.log(data.data().ranking);
console.log(this.ranking);
console.log(this.userRecord);
console.log(this.userHighScore);
</script>
