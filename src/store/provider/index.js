// 파이어베이스 앱 객체 모듈 가져오기
import firebase from "firebase/compat/app";

// 파이어베이스 패키지 모듈 가져오기
import "firebase/auth"
import router from "@/router";

export default {
    state: {
        oUser: null // 사용자 정보를 담을 객체
    },

    mutations: {
        // 1. 사용자 객체를 저장
        fnSetUser(state, payload) {
            state.oUser = payload;
        }
    },

    getters: {
        // 2. 사용자 객체를 반환
        fnGetUser(state) {
            return state.oUser;
        },

        // 3. 사용자 객체를 검사해 로그인 여부 반환
        fnGetAuthStatus(state) {
            return state.oUser != null;
        }
    },

    actions: {
        // 1. (이메일) 회원 가입 처리
        fnRegisterUser({ commit }, payload) {
            // actions -> mutations로  state 저장 시 commit 사용

            // 파이어베이스에 이메일 회원 생성 및 저장
            firebase.auth().createUserWithEmailAndPassword(payload.pEmail, payload.pPassword)
            .then(pUserInfo => {
                // 신규 회원 이메일 정보를 스토어에 저장
                pUserInfo.user.updateProfile({
                    displayName: payload.pName,
                });
                commit("fnSetErrorMessage", "") // 스토어 에러 메시지 초기화
                router.push("/first"); // 로그인 이후 가야 할 화면으로 이동
            })
            .catch(err => {
                commit("fnSetErrorMessage", err.message);
            });
        },

        // 2. (이메일) 회원 로그인 처리
        fnDoLogin({ commit }, payload) {
            // actions -> mutations로  state 저장 시 commit 사용

            // 파이어베이스에 이메일 회원 로그인 인증 처리 요청
            firebase.auth().signInWithEmailAndPassword(payload.pEmail, payload.pPassword)
            .then(pUserInfo => {
                // 로그인에 성공하면 스토어에 계정 정보 저장
                commit("fnSetUser", {
                    id: pUserInfo.user.uid,
                    name: pUserInfo.user.displayName,
                    email: pUserInfo.user.email,
                    photoURL: pUserInfo.user.photoURL
                });
                commit("fnSetErrorMessage", "") // 스토어 에러 메시지 초기화
                router.push("/main"); // 로그인 이후 가야 할 화면으로 이동
            })
            .catch(err => {
                commit("fnSetErrorMessage", err.message);
            });
        },

        // 3. (구글 계정) 회원 로그인 -> popup
        fnDoGoogleLogin_Popup({ commit }) {
            // 파이어베이스에 구글 회원 로그인 인증 처리 요청
            // 로그인 제공자 객체를 생성
            var gProvider = new firebase.auth.GoogleAuthProvider();

            // 오픈 계정의 범위 설정 (아래 두 가지 정보를 사용해도 되는지 user에게 요청)
            gProvider.addScope("profile");
            gProvider.addScope("email");

            firebase.auth().signInWithPopup(gProvider)
            .then(pUserInfo => {
                // 로그인에 성공하면 스토어에 계정 정보 저장
                commit("fnSetUser", {
                    id: pUserInfo.user.uid,
                    name: pUserInfo.user.displayName,
                    email: pUserInfo.user.email,
                    photoURL: pUserInfo.user.photoURL
            });
                commit("fnSetErrorMessage", "") // 스토어 에러 메시지 초기화
                router.push("/main"); // 로그인 이후 가야 할 화면으로 이동
            })
            .catch(err => {
                commit("fnSetErrorMessage", err.message);
            });
        },

        // 4. 자동 로그인 처리
        fnDoLoginAuto({ commit }, pUserInfo) {
            // 자동 로그인 시 스토어에 계정 정보 저장
            commit("fnSetUser", {
                id: pUserInfo.user.uid,
                name: pUserInfo.user.displayName,
                email: pUserInfo.user.email,
                photoURL: pUserInfo.user.photoURL
            });
            commit("fnSetErrorMessage", "") // 스토어 에러 메시지 초기화
        },

        // 5. 로그아웃 처리
        fnDoLogout({ commit }) {
            // 파이어베이스에 로그아웃 요청
            firebase.auth().signOut();
            commit("fnSetUser", null); // 스토어에 계정 정보 초기화
            router.push("/");
        }
    }
}