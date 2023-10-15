<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "~/store/user";

// 環境変数（.env参照）からAPIのベースURLを取得
const $config = useRuntimeConfig();
const apiBaseUrl = $config.public.apiBaseUrl;
const router = useRouter();

// ユーザーストアを取得
const userStore = useUserStore();

// ページがマウントされたときに実行
onMounted(() => {
  // ログインしていなければ、エラーページへリダイレクト
  if (!userStore.isLoggedIn) {
    router.push("/NeedSignin");
  }
});

// メモのデータを格納するリアクティブな変数を作成
const memoData = ref({
  title: "",
  content: "",
  author_id: 1,
});

// メモを保存する非同期関数を定義
const saveMemo = async () => {
  try {
    // メモをAPIに送信して保存
    const { data } = await useFetch(`${apiBaseUrl}/articles/add`, {
      method: "POST",
      // ヘッダーにトークンを含める
      headers: {
        Authorization: `Bearer ${userStore.token}`,
      },
      body: {
        title: memoData.value.title,
        content: memoData.value.content,
        author_id: memoData.value.author_id,
      },
    });
    // 保存が成功した場合、APIからの応答データをログに表示
    console.log(data);

    // メモを保存した後、入力欄をクリア
    memoData.value.title = "";
    memoData.value.content = "";

    // メモ一覧ページへ遷移
    router.push("/MemoList");
  } catch (error) {
    // エラーが発生した場合、エラーをログに表示
    console.log(error);
  }
};
</script>

<template>
  <div>
    <form @submit.prevent="saveMemo">
      <p>タイトル</p>
      <input type="text" v-model="memoData.title" placeholder="メモタイトル" />
      <p>本文</p>
      <textarea v-model="memoData.content" placeholder="本文"></textarea>

      <button type="submit">追加</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  margin-top: 50px;

  input,
  textarea {
    margin-bottom: 8px;
    height: 30px;
    width: 70%;
    max-width: 400px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  textarea {
    height: 100px;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  button {
    height: 40px;
    width: 60px;
    font-size: 16px;
    margin-top: 8px;
  }
  p {
    margin: 4px 0;
  }
}
</style>
