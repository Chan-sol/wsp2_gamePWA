<template>
    <div>
        <v-content>
            <p class="game_name">Puzzle</p>
            <v-divider></v-divider>
            <p class="game_description">A user who plays this game have to complete the whole picture by moving the pieces of the picture in a right order.<br>
            A puzzle pieces can only be moved in four directions.
            </p>
            <div class="game_button">
            <v-btn fab large class="mt-5" color="#fe4063" dark to="/numberBaseball">
                <v-icon>radio_button_unchecked</v-icon>
            </v-btn>
            </div>
        </v-content>
        <v-divider></v-divider>
        <v-content>
            <p class="game_name">Updown Game</p>
            <v-divider></v-divider>
            <p class="game_description">This is a game that the user guesses the random number.<br>When the user enters the estimated value, it tells whether it is greater or less than the answer.</p>
            <div class="game_button">
            <v-btn fab large class="mt-5" color="#fe4063" dark to="/Updown">
                <v-icon>change_history</v-icon>
            </v-btn>
            </div>
        </v-content>
        <v-divider></v-divider>
        <v-content>
            <p class="game_name">MukChiPa</p>
            <v-divider></v-divider>
            <p class="game_description">A user starts with a regular rock scissor paper game.<br>Then the winner from the previous round becomes the attacker.<br>
            The attacker tries to win the game by throwing the same hand as the opponent.
            </p>
            <div class="game_button">
            <v-btn fab large class="mt-5" color="#fe4063" dark to="/MukChiPa">
                <v-icon>check_box_outline_blank</v-icon>
            </v-btn>
            </div>
        </v-content>
    </div>
</template>
<script>
</script>
<style scoped src="./gameCss/gameSelect_page.css">
</style>
