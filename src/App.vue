<template>
  <v-app>
    <v-app-bar app color="rgb(25, 25, 25)" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title color="white">SQUID GAME</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
    </v-app-bar>
    <v-content class="bgColor">
      <v-slide-x-transition mode="out in">
        <router-view></router-view>
      </v-slide-x-transition>
    </v-content>
  </v-app>
</template>
<script>
export default {
    name: 'App',
    created() {
        // 다크 모드
        // this.$vuetify.theme.dark = true;
    }
}
</script>
<style>
  .bgColor {
    background-color: rgb(34, 34, 34);
  }
</style>