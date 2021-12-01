<template>
    <div>
        <v-content>
            <p class="display-1 my-4 game_name">Game 1</p>
            <v-divider></v-divider>
            <p class="game_description">This is our game 1.</p>
            <div class="game_button">
            <v-btn fab large class="mt-5" color="#fe4063" dark to="/numberBaseball">
                <v-icon>radio_button_unchecked</v-icon>
            </v-btn>
            </div>
        </v-content>
        <v-divider></v-divider>
        <v-content>
            <p class="display-1 my-4 game_name">Game 2</p>
            <v-divider></v-divider>
            <p class="game_description">This is our game 2.</p>
            <div class="game_button">
            <v-btn fab large class="mt-5" color="#fe4063" dark to="/Updown">
                <v-icon>change_history</v-icon>
            </v-btn>
            </div>
        </v-content>
        <v-divider></v-divider>
        <v-content>
            <p class="display-1 my-4 game_name">Game 3</p>
            <v-divider></v-divider>
            <p class="game_description">This is our game 3.</p>
            <div class="game_button">
            <v-btn fab large class="mt-5" color="#fe4063" dark to="/seohyeon">
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
