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
        <label for="name">ユーザー名</label>
        <input type="text" v-model="username" id="name" required />
      </div>
      <div class="input-group">
        <label for="email">メールアドレス</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div class="input-group">
        <label for="password">パスワード</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">登録</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.register-page {
  width: 100%;
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    margin-bottom: 30px;
    font-weight: bold;
    color: #333;
  }

  form {
    .input-group {
      margin-bottom: 20px;

      label {
        display: block;
        margin-bottom: 10px;
        font-weight: bold;
        color: #555;
      }

      input {
        width: 100%;
        padding: 8px 10px;
        border: 1px solid #dcdcdc;
        border-radius: 5px;
        font-size: 16px;
        color: #555;

        &:focus {
          border-color: #a0a0a0;
          outline: none;
        }
      }
    }

    button {
      width: 100%;
      padding: 10px 15px;
      background-color: #007bff;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      color: #fff;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #0056b3;
      }

      &:disabled {
        background-color: #c6c6c6;
        cursor: not-allowed;
      }
    }
  }
}
</style>
