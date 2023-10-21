<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { useUserStore } from "~/store/user";
import { SignInResponse } from "~/types/api";

// 環境変数（.env参照）からAPIのベースURLを取得
const $config = useRuntimeConfig();
const apiBaseUrl = $config.public.apiBaseUrl;
// ユーザーストアを取得
const userStore = useUserStore();
// 転送処理を行うためのフック
const $router = useRouter();

// フォームの設定
const { handleSubmit, isSubmitting } = useForm({
  // バリデーションルール
  validationSchema: {
    email(value: string) {
      // 必須
      if (!value) {
        return "メールアドレスを入力してください";
      }
      // メールアドレスの形式
      const emailPattern =
        /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
      if (!emailPattern.test(value)) {
        return "メールアドレスの形式が正しくありません";
      }
      return true;
    },
    password(value: string) {
      if (!value) {
        return "パスワードを入力してください";
      }
      return true;
    },
  },
});
// フィールドの値とエラーメッセージを取得
const { value: email, errorMessage: emailErrorMessage } = useField("email");
const { value: password, errorMessage: passwordErrorMessage } =
  useField("password");

/**
 * サインイン処理
 */
const onSubmit = handleSubmit(async () => {
  try {
    // ログインAPIを呼び出す -> /backend/src/routes/auth/auth.router.tsを参照
    const { data } = await useFetch<SignInResponse>(
      `${apiBaseUrl}/auth/signin`,
      {
        method: "POST",
        body: {
          email: email.value,
          password: password.value,
        },
      }
    );

    // レスポンスのデータを取得（ref値）
    const response = data.value;
    // トークンの有無でログインできたか判断
    const hasToken = response && !!response.token;
    if (hasToken) {
      // 成功の場合はトークンを保存
      userStore.token = response.token;
      userStore.email = response.email;
      // ローカルストレージにもトークンとメールアドレスを保存
      localStorage.setItem("userToken", response.token);
      localStorage.setItem("userEmail", response.email);
      // メモ入力画面へ遷移
      $router.push("/MemoInput");
    } else {
      // 失敗の場合はフィールドをクリア
      email.value = "";
      password.value = "";
    }
  } catch (error) {
    console.log(error);
  }
});

// ページのタイトルなどを設定
useHead({
  title: "サインインページ",
});
</script>

<template>
  <div class="signin-box">
    <h2>サインイン</h2>
    <form @submit="onSubmit">
      <label for="email">メールアドレス</label>
      <input v-model="email" name="email" type="email" />
      <p class="error">{{ emailErrorMessage }}</p>
      <label for="password">パスワード</label>
      <input
        v-model="password"
        name="password"
        type="password"
        autocomplete="on"
      />
      <p class="error">{{ passwordErrorMessage }}</p>
      <button type="submit" :disabled="isSubmitting">送信</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 20px;
  @media #{$pc} {
    font-size: 2.4rem;
  }
}

.error {
  color: $colorRed;
  font-size: 1.4rem;
}

.signin-box {
  width: 100%;
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  form {
    width: 100%;

    input {
      width: 100%;
      padding: 8px 10px;
      margin-bottom: 10px;
      border: 1px solid #dcdcdc;
      border-radius: 5px;
      font-size: 16px;
      color: #555;

      &:focus {
        border-color: #a0a0a0;
        outline: none;
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
