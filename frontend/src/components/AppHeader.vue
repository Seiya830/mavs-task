<script setup lang="ts">
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
</script>

<template>
  <!-- アプリケーションの共通ヘッダー -->
  <header class="header">
    <div class="header__inner">
      <h1>
        <NuxtLink to="/">メモアプリ</NuxtLink>
      </h1>
      <div>
        <div v-if="userStore.isLoggedIn">
          <p>ようこそ！<br />{{ userStore.email }}さん</p>
          <button type="button" @click="userStore.logout()">ログアウト</button>
        </div>
        <div v-else>
          <NuxtLink to="/signin" class="signin">サインイン</NuxtLink>
          <NuxtLink to="/">新規登録</NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  &__inner {
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
    .signin {
      margin-right: 30px;
    }
  }
}
</style>
