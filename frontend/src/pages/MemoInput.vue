<script lang="ts">
export default {
  data() {
    return {
      memoTitle: "",
      memoBody: "",
      memos: [] as { title: string; body: string }[], // メモを格納するリスト
    };
  },
  methods: {
    addMemo() {
      // 入力内容を新しいオブジェクトとして memos リストに追加
      this.memos.push({
        title: this.memoTitle,
        body: this.memoBody,
      });

      // 入力内容をクリア
      this.memoTitle = "";
      this.memoBody = "";
    },
  },
};
</script>

<template>
  <div>
    <form @submit.prevent="addMemo">
      <p>タイトル</p>
      <input
        type="text"
        v-model="memoTitle"
        placeholder="メモタイトル"
        required
      />
      <p>本文</p>
      <textarea v-model="memoBody" placeholder="本文" required></textarea>

      <button type="submit">追加</button>
    </form>

    <!-- メモの入力内容を表示 -->
    <div v-for="(memo, index) in memos" :key="index">
      <p>メモタイトル: {{ memo.title }}</p>
      <button>編集</button>
      <button>削除</button>
      <p>メモ本文: {{ memo.body }}</p>
      <button>編集</button>
      <button>削除</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* スタイリングをここに追加 */
</style>
