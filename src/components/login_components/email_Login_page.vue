<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="text-center my-5">
                <h1 class="display-1 email">Email Login</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="text-center inputFields" cols="8" offset="2" sm="6" offset-sm="3">
                <form @submit.prevent="fnDoLogin">
                    <v-text-field name="Email" label="Email" type="email" v-model="sEmail" required class="white--text"></v-text-field>
                    <v-text-field name="Password" label="PassWord" type="password" v-model="sPassword" required></v-text-field>
                    <v-btn type="submit" v-if="!fnGetLoading" color="orange" dark>Login</v-btn>
                    <v-progress-circular
                    v-if="fnGetLoading"
                    indeterminate
                    :width="7"
                    :size="70"
                    color="white darken-1"
                    ></v-progress-circular>
                    <v-alert class="mt-3" type="error" dismissible v-model="bAlert">{{ fnGetErrMsg }}</v-alert>
                </form>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            bAlert: false, // 오류 메시지 표시 여부
            sEmail: "", // 이메일 입력값 임시 저장
            sPassword: "", // 비밀번호 입력값 임시 저장
        };
    },
     computed: {
         // 오류 메시지 스토어에서 읽어서 반환
         fnGetErrMsg() {
             return this.$store.getters.fnGetErrorMessage;
         },
         // 시간 지연 상태 스토어에서 읽어서 반환
         fnGetLoading() {
             return this.$store.getters.fnGetLoading;
         }
     },
     methods: {
         // 스토어에서 이메일 로그인 처리 요청
         fnDoLogin() {
             this.$store.dispatch("fnDoLogin", {
                 pEmail: this.sEmail,
                 pPassword: this.sPassword
             });
         }
     },
     watch: {
         // fnGetErrMsg() 함수가 오류 메시지를 반환하면 오류 메시지 표시
         fnGetErrMsg(pMsg) {
             if(pMsg) this.bAlert = true;
         },
         // bAlert값이 false로 바뀌면 오류 메시지 초기화
         bAlert(pValue) {
             if(pValue == false) this.$store.commit("fnSetErrorMessage", "");
         }
     }
};
</script>
<style>
    .email, .inputFields {
        color: white;
    }
</style>
