<template>
  <div>
    <v-list>
      <v-list-item>
        <v-list-item-title class="mt-5 welcome">Welcome to S<b>Q</b>UID G<b>A</b>M<b>E</b></v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
export default {
    computed: {
      // 로그인 여부에 따라 다르게 탐색 서랍과 툴바 메뉴명 항목 배열 반환
      fnGetAuthStatus() {
        return this.$store.getters.fnGetAuthStatus
      },
      // 스토어에서 로그인된 계정 정보 반환
      fnGetUser() {
          let oUserInfo = this.$store.getters.fnGetUser;
          return oUserInfo;
      },
    }
}
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');

  .welcome {
    font-family: 'Oswald', sans-serif;
    font-size: 22px;
    font-weight: bold;
    color: black;
  }
</style>
