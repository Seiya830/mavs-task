<template>
  <div class="app-container">
    <h2>メモアプリ</h2>
    <div class="link-container">
      <nuxt-link to="/signin" class="link-button">サインイン</nuxt-link>
      <nuxt-link to="/register" class="link-button">新規登録</nuxt-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;

  h2 {
    margin-bottom: 16px;
  }
}

.link-container {
  .link-button {
    display: inline-block;
    margin-bottom: 10px;
    margin-right: 10px;
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }

    &:last-child {
      margin-right: 0;
      margin-bottom: 0;
    }
  }
}
</style>
