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
  // ログインしていなければ、ログイン要求ページへリダイレクト
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
  <!-- ユーザーがログインしている場合のみ内容を表示 -->
  <div v-if="userStore.isLoggedIn" class="memo-box">
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
.memo-box {
  width: 100%;
  max-width: 450px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      margin: 4px 0;
      font-weight: 500;
    }

    input,
    textarea {
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

    textarea {
      height: 100px;
      resize: vertical;
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
    }
  }
}
</style>
