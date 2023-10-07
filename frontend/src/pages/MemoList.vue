<script setup lang="ts">
import { ref, onMounted } from "vue";
// 必要に応じてuseFetchをインポート
const $config = useRuntimeConfig();
const apiBaseUrl = $config.public.apiBaseUrl;

// メモの型情報としてMemoというインターフェイスを定義
interface Memo {
  id: number;
  title: string;
  content: string;
  author_id: number;
}

// メモのリストを格納するrefを作成
const memos = ref<Memo[] | null>([])

// APIからメモを取得する関数を定義
const fetchMemos = async () => {
  try {
    // APIからメモを取得し、memosにセット
    const response = await useFetch(`${apiBaseUrl}/articles/get`, {
      method: "GET",
    });
    memos.value = (response.data as Ref<Memo[]>).value;
  } catch (error) {
    // エラーが発生した場合、コンソールにエラー情報を出力
    console.log(error);
  }
};
// コンポーネントがマウントされたときにfetchMemos関数を実行
onMounted(fetchMemos);
</script>

<template>
  <!-- メモ一覧ページのテンプレート部分 -->
  <div>
    <h2>メモ一覧ページ</h2>
    <ul>
      <li v-for="memo in memos" :key="memo.id">
        <h2>{{ memo.title }}</h2>
        <p>{{ memo.content }}</p>
      </li>
    </ul>
  </div>
</template>
