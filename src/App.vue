<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <img
      alt="Vue logo"
      src="./assets/kakao_login_medium_narrow.png"
      @click="kakaoLogin"
    />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data: () => {
    return {
      client_id: process.env.VUE_APP_REST_API_KEY,
      redirect_uri: process.env.VUE_APP_REDIRECT_URI,
    };
  },
  methods: {
    kakaoLogin() {
      window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&response_type=code`;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
