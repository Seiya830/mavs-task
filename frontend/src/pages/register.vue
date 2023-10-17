<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "RegisterPage",
  setup() {
    // 必要なVue RouterとRuntime Configを取得
    const router = useRouter();
    const $config = useRuntimeConfig();

    // APIの基本URLを取得
    const apiBaseUrl = $config.public.apiBaseUrl;

    // refを使用してデータバインディング用のリアクティブな変数を設定
    const username = ref("");
    const email = ref("");
    const password = ref("");

    const register = async () => {
      try {
        // APIへのリクエストを実行してユーザーを登録
        const response = await fetch(`${apiBaseUrl}/users/createUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value,
          }),
        });

        // レスポンスを解析
        const data = await response.json();

        // エラーがあればコンソールに表示
        if (data.error) {
          console.error(data.error);
        } else {
          // 登録が成功した場合、サインインページへ遷移
          router.push("/signin");
        }
      } catch (error) {
        // 例外が発生した場合、エラーをコンソールに表示
        console.error("登録中にエラーが発生しました:", error);
      }
    };

    // テンプレートに使用する変数や関数を返す
    return {
      username,
      email,
      password,
      register,
    };
  },
});
</script>

<template>
  <!-- 新規ユーザー登録ページのテンプレート -->
  <div class="register-page">
    <h2>新規登録</h2>
    <form @submit.prevent="register">
      <div class="input-group">
        <label for="name">ユーザー名:</label>
        <input type="text" v-model="username" id="name" required />
      </div>
      <div class="input-group">
        <label for="email">メールアドレス:</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div class="input-group">
        <label for="password">パスワード:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">登録</button>
    </form>
  </div>
</template>

<style scoped>
/* 必要に応じてスタイルを追加 */
</style>
