<template>
    <v-container>
        <v-img max-height="50vh" src="./loginCss/logo.png" class="mt-5"></v-img>
        <v-row>
            <v-col cols="12" class="text-center mt-5">
                <!-- mt-5 ) 바깥쪽 여백, top, 48px -->
                <v-progress-circular
                v-if="fnGetLoading"
                indeterminate
                :width="7"
                :size="70"
                color="white darken-1"
                ></v-progress-circular>
            </v-col>
            <v-col offset="3" cols="6" class="text-center mt-5">
                <!-- 구글 계정 로그인 버튼 표시 및 처리 -->
                <v-btn @click="fnDoGoogleLogin_Popup" block color="#fe4063" large class="font-weight-bold">
                    <v-icon left color="white">mdi-google</v-icon>구글 로그인
                </v-btn>
            </v-col>
            <v-col offset="3" cols="6" class="text-center mt-5">
                <!-- 이메일 계정 로그인 버튼 표시 및 처리 -->
                <v-btn to="/emailLogin" block color="#008080" large class="font-weight-bold">
                    <v-icon left color="white">mdi-email</v-icon>이메일 로그인
                </v-btn>
            </v-col>
            <v-col offset="3" cols="6" class="text-center mt-5">
                <v-btn to="/emailRegister" block color="#e6ebce" large class="black--text font-weight-bold">
                    <v-icon left color="black">mdi-pencil</v-icon>회원가입
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    methods: {
        fnDoGoogleLogin_Popup() {
            // 스토어에 구글 계정 로그인 처리 요청
            this.$store.dispatch("fnDoGoogleLogin_Popup"); // actions에 정의되어 있으므로 dispatch() 함수를 사용해 실행
        }
    },
    computed: {
        fnGetLoading() {
            // 시간 지연 상태 스토어에서 읽어서 반환
            this.$store.getters.fnGetLoading;
        }
    }
}
</script>