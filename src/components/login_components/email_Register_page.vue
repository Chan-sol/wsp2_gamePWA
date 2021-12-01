<template>
    <v-container>
        <div class="emailRegisterContainer">
            <h1 class="email"><b>E</b>mail <b>R</b>egi<b>s</b>ter</h1>
            <!-- 양식 입력이 제출되고 페이지를 새로 고침하지 않도록 prevent -->
            <form @submit.prevent="fnRegisterUser" class="formContainer">
                <!-- 필수 입력 사항이 되도록 required 속성 적용 -->
                <v-text-field dark color="#fe4063" name="Name" label="Name" type="text" v-model="sName" required></v-text-field>
                <v-text-field dark color="#fe4063" name="Email" label="Email" type="email" v-model="sEmail" required></v-text-field>
                <v-text-field dark color="#fe4063" name="Password" label="Password" type="password" v-model="sPassword" required></v-text-field>
                <!-- 비밀번호 확인이 맞는지 검사하도록 rules 속성 적용 -->
                <v-text-field dark color="#fe4063" name="ConfirmPassword" label="Confirm Password" type="password" v-model="sConfirmPassword" required :rules="[fnComparePassword]"></v-text-field>
                <!-- 시간 지연 상태면 버튼이 사라지게 함 -->
                <button type="submit" class="mt-5 btn squidRed">
                    <v-icon class="mr-2">mdi-login</v-icon>Register
                </button>
                <v-alert type="error" dismissible v-model="bAlert">{{ fnGetErrMsg }}</v-alert>
            </form>
        </div>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            bAlert: false, // 오류 메세지 표시 여부
            sName: "",   // 이름 입력값 임시 저장
            sEmail: "", // 이메일 입력값 임시 저장
            sPassword: "", // 비밀번호 입력값 임시 저장
            sConfirmPassword: "" // 비밀번호 입력 확인값 임시 저장
        };
    },
    computed: {
        // 비밀번호와 비밀번호 확인 값이 일치하는지 검사
        fnComparePassword() {
            if(this.sPassword == this.sConfirmPassword) return true;
            else return "비밀번호가 일치하지 않습니다!";
        },
        // 오류 메시지 스토어에서 읽어서 반환
        fnGetErrMsg() {
            return this.$store.getters.fnGetErrorMessage;
        },
    },
    methods: {
        // 스토어에 이메일 회원가입 처리 요청
        fnRegisterUser() {
            if(this.fnComparePassword == true) {
                this.$store.dispatch("fnRegisterUser", {
                    pEmail: this.sEmail,
                    pPassword: this.sPassword,
                    pName: this.sName,
                });
            }
        }
    },
    watch: {
        // fnGetErrMsg() 함수가 오류 메시지를 반환하면 오류 메시지 표시
        fnGetErrMsg(pMsg) {
            if(pMsg) this.bAlert = true;
        },
        // bAlert값이 false로 바뀌면 에러 메시지 초기화
        bAlert(pValue) {
            if(pValue == false) this.$store.commit("fnSetErrorMessage", "");
        }
    }
};
</script>
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');

    .container, .emailRegisterContainer {
        width: 100%;
        height: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .email {
        font-family: 'Oswald', sans-serif;
        font-size: 12vmin;
        color: #e6ebce;
        text-align: center;
        margin-bottom: 30px;
    }

    .formContainer {
        width: 100%;
        height: 40vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .v-input {
        width: 70%;
    }
</style>
<style src="../css/button.css"></style>