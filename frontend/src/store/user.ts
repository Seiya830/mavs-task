import { defineStore } from 'pinia'

interface State {
  token: string
  email: string
}

export const useUserStore = defineStore('user', {
  /**
   * ユーザーの認証情報を保持するためのState
   */
  state: (): State => {
    return {
      token: '',
      email: '',
    }
  },

  actions: {
    /**
     * ログアウト
     */
    logout() {
      this.$reset()
    },
    /**
     * ログイン
     */
    login({ token, email }: State) {
      this.token = token;
      this.email = email;
      localStorage.setItem("userToken", token);
      localStorage.setItem("userEmail", email);
    },

    /**
     * トークンの更新
     */
    updateToken(newToken: string) {
      this.token = newToken
    }
  },

  getters: {
    /**
     * ログイン状態の判定
     */
    isLoggedIn: (state) => {
      return state.token !== ''
    },
  },
})
