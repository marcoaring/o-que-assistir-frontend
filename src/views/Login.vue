<template>
  <div class="login">
    <h1 class="login__title">O que assistir?</h1>

    <form @submit="submitForm">
      <label>Login</label>
      <input v-model="login" type="text" placeholder="Digite seu e-mail" />

      <label>Senha</label>
      <input
        v-model="password"
        type="password"
        placeholder="Digite sua senha"
      />

      <button type="submit">Logar!</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      login: null,
      password: null,
    };
  },
  methods: {
    async submitForm(e) {
      e.preventDefault();
      const url = "http://localhost:3000/api/authenticate";

      const result = (
        await axios.post(url, {
          email: this.login,
          password: this.password,
        })
      ).data;

      localStorage.token = result.token;
      this.$router.push("/");
    },
  },
};
</script>
