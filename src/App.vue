<template>
  <v-app>
    <v-content>
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
        this.$vuetify.theme.dark = true;
    }
}
</script>
