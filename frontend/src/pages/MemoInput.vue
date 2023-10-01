<script lang="ts">
export default {
  data() {
    return {
      title: "",
      content: "",
      author_id: "",
      memos: [] as { title: string; content: string }[], // メモを格納するリスト
    };
  },
  methods: {
    async addMemo() {
      try {
        // 新しいメモを作成するためのPOSTリクエストを送信
        const response = await fetch("/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: this.title,
            body: this.content,
          }),
        });

        if (response.ok) {
          // 入力フィールドをクリア
          this.title = "";
          this.content = "";

          const newMemo = await response.json();
          this.memos.push(newMemo);
        } else {
          console.error("メモの作成中にエラーが発生しました");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<template>
  <div>
    <form @submit.prevent="addMemo">
      <p>タイトル</p>
      <input type="text" v-model="title" placeholder="メモタイトル" required />
      <p>本文</p>
      <textarea v-model="content" placeholder="本文" required></textarea>

      <button type="submit">追加</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
/* スタイリングをここに追加 */
</style>
