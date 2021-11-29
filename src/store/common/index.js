export default {
    state: {
        sErrorMessage: '', // 처리 중 오류 메시지 내용
    },
    mutations: {
        // 처리 중 오류 메시지 저장
        fnSetErrorMessage(state, payload) {
            state.sErrorMessage = payload
        }
    },
    getters: {
        // 처리 중 에러 메시지 내용 반환
        fnGetErrorMessage(state) {
            return state.sErrorMessage
        }
    },
    actions: {
    }
}