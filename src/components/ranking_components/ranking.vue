<template>
    <v-container>
        <h1>Ranking</h1>
        <h2 v-model="score">{{ score }}</h2>
    </v-container>
</template>
<script>
export default {
    data () {
        return {
            gameName: '',
            score: '',
            rank: '',
        }
    }
}
</script>
