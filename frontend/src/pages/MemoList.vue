<script setup lang="ts">
import { ref } from "vue";

const $config = useRuntimeConfig();
const apiBaseUrl = $config.public.apiBaseUrl;

// メモのデータリストを格納するためのリアクティブ変数
const memos = ref([]);

const fetchMemos = async () => {
  try {
    const { data } = await useFetch(`${apiBaseUrl}/articles/get`, {
      method: "GET",
    });
    memos.value = data;
  } catch (error) {
    console.log(error);
  }
};

// マウント時にメモのデータを取得
onMounted(fetchMemos);
</script>

<template>
  <div>
    <ul>
      <li v-for="memo in memos" :key="memo.id">
        <h2>{{ memo.title }}</h2>
        <p>{{ memo.content }}</p>
      </li>
    </ul>
  </div>
</template>
