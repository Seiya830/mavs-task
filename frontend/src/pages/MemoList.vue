<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";

const $config = useRuntimeConfig();
const apiBaseUrl = $config.public.apiBaseUrl;

// メモのデータ構造を定義するインターフェイス
interface Memo {
  id: number;
  title: string;
  content: string;
  author_id: number;
}

// メモのリストを保持するリアクティブな変数
// 初期値としてMemoの配列を持つ空の配列を設定
const memos = ref<Memo[]>([]);

// メモの編集状態を示す。`true`の場合、編集中とみなす
// 初期値は`false`で、デフォルトでは編集中ではないと設定
const isEditing = ref<boolean>(false);

// 編集中のメモのデータを保持するリアクティブなオブジェクト
// 初期値として空のメモデータを設定
const editingMemo = reactive<Memo>({
  id: 0,
  title: "",
  content: "",
  author_id: 0,
});

// メモを取得する非同期関数を定義
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

// 指定されたIDのメモを削除する非同期関数を定義
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

// 編集を開始し、編集するメモのデータをセットする関数
const startEditing = (memo: Memo) => {
  isEditing.value = true;
  editingMemo.id = memo.id;
  editingMemo.title = memo.title;
  editingMemo.content = memo.content;
  editingMemo.author_id = memo.author_id;
};

// 編集内容を保存し、更新する非同期関数を定義
const saveEdit = async () => {
  try {
    await useFetch(`${apiBaseUrl}/articles/edit/${editingMemo.id}`, {
      method: "PUT",
      // 編集されたメモのデータをJSON形式でリクエストボディに含める
      body: JSON.stringify(editingMemo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // 現在のメモリストから編集されたメモのインデックスを取得
    const index = memos.value.findIndex((memo) => memo.id === editingMemo.id);
    // インデックスが存在する場合、メモリストの該当のメモを更新
    if (index !== -1) {
      memos.value[index] = { ...editingMemo };
    }
    // 編集モードを終了
    isEditing.value = false;
  } catch (error) {
    console.log(error);
  }
};

// コンポーネントがマウント（初期化）されたときにfetchMemos関数を実行
onMounted(fetchMemos);
</script>

<template>
  <div>
    <h2>メモ一覧ページ</h2>

    <ul>
      <!-- メモのリストをループして表示 -->
      <li v-for="memo in memos" :key="memo.id">
        <h2>{{ memo.title }}</h2>
        <p>{{ memo.content }}</p>
        <!-- 編集ボタンをクリックするとstartEditing関数を実行し、メモの編集モードを開始する。引数としてループ中の`memo`オブジェクトを渡す。-->
        <button @click="() => startEditing(memo)">編集</button>
        <!-- 削除ボタンをクリックすると、該当のメモIDでdeleteMemo関数を実行 -->
        <button @click="() => deleteMemo(memo.id)">削除</button>
      </li>
    </ul>

    <!-- 編集用のモーダルウィンドウ -->
    <!-- `isEditing`がtrueの場合のみ表示 -->
    <div v-if="isEditing" class="modal">
      <h3>メモ編集</h3>
      <!-- タイトルと本文の編集フォーム -->
      <label>
        タイトル:
        <input v-model="editingMemo.title" />
      </label>
      <label>
        内容:
        <textarea v-model="editingMemo.content"></textarea>
      </label>
      <button @click="saveEdit">保存</button>
      <button @click="() => (isEditing = false)">キャンセル</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  /* Modal styling */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #eeeeee;
  z-index: 1000;
}
</style>
