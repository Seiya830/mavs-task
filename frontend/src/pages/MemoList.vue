<script setup lang="ts">
import { ref, onMounted } from "vue";

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
const memos = ref<Memo[]>([]);

// APIからメモを取得する非同期関数を定義
const fetchMemos = async () => {
  try {
    // useFetchを使用してAPIからメモを取得
    const response = await useFetch(`${apiBaseUrl}/articles/get`, {
      method: "GET",
    });
    // 取得したメモをmemosに代入
    memos.value = (response.data as Ref<Memo[]>).value;
  } catch (error) {
    // エラーが発生した場合、コンソールにエラー情報を出力
    console.log(error);
  }
};

// 指定されたIDのメモをAPIを通して削除する非同期関数を定義
const deleteMemo = async (id: number) => {
  try {
    await useFetch(`${apiBaseUrl}/articles/delete/${id}`, {
      method: "DELETE",
    });
    // メモの削除が成功した場合、フロントエンドのリストからもメモを削除
    memos.value = memos.value.filter((memo) => memo.id !== id);
  } catch (error) {
    console.log(error);
  }
};

// コンポーネントがマウント（初期化）されたときにfetchMemos関数を実行
onMounted(fetchMemos);
</script>

<template>
  <!-- メモ一覧ページのテンプレート部分 -->
  <div>
    <h2>メモ一覧ページ</h2>
    <ul>
      <!-- v-forディレクティブを使用してmemosリスト内の各メモを繰り返し表示 -->
      <li v-for="memo in memos" :key="memo.id">
        <h2>{{ memo.title }}</h2>
        <p>{{ memo.content }}</p>
        <button>編集</button>
        <!-- 削除ボタンをクリックすると、該当のメモIDでdeleteMemo関数を実行 -->
        <button @click="() => deleteMemo(memo.id)">削除</button>
      </li>
    </ul>
  </div>
</template>
