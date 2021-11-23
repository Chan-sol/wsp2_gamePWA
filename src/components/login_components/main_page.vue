<!-- 로그인 후 메인 화면을 표시 -->
<template>
    <v-container>
        <v-row>
            <v-col cols="4" offset="8" sm="3" offset-sm="9" class="text-center my-4">
                <v-btn @click="fnDoLogout" color="orange" dark>로그 아웃</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col xs="12" class="mt-5 text-center">
                <h1 class="display-1 my-1">오징어 게임에 오신 걸 환영합니다</h1>
            </v-col>
            <v-row>
                <v-col dark offset="1" cols="10" class="mt-5 text-center">
                    <!-- 구글 로그인인 경우 사진 이미지 정보 표시 -->
                    <img v-if="fnGetUser.photoURL" :src="fnGetUser.photoURL" class="avatar_style" alt />
                    <h3 class="pt-2 mt-4 white lighten-2">{{ fnGetUser.name }}</h3>
                    <p class="pb-2 white lighten-2">{{ fnGetUser.email }}</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col xs="12" class="mt-5 text-center">
                    <h3 class="white">{{ fnGetUser.name }}님의 Ranking 현황</h3>
                    <v-btn to="/gameSelect" color="orange" dark class="mt-5">메뉴로</v-btn>
                </v-col>
            </v-row>
        </v-row>
    </v-container>
</template>
<script>
export default {
    computed: {
        // 스토어에서 로그인된 계정 정보 반환
        fnGetUser() {
            let oUserInfo = this.$store.getters.fnGetUser;
            return oUserInfo;
        }
    },
    methods: {
        // 스토어의 로그아웃 기능 사용
        fnDoLogout() {
            this.$store.dispatch('fnDoLogout')
        }
    },
}
</script>
<style>
    .avatar_style {
        /* 사진 이미지 원 모양 */
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
</style>