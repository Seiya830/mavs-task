<script setup lang="ts">
// Vue3のComposition APIから必要な関数をインポート
import { ref } from "vue";

// 環境変数（.env参照）からAPIのベースURLを取得
const $config = useRuntimeConfig();
const apiBaseUrl = $config.public.apiBaseUrl;

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
      body: {
        title: memoData.value.title,
        content: memoData.value.content,
        author_id: memoData.value.author_id,
      },
    });
    // 保存が成功した場合、APIからの応答データをログに表示
    console.log(data);
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
/* スタイリングをここに追加 */
</style>
