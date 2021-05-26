<template>
  <div class="login">
    <h1 class="login__title">O que assistir?</h1>

    <form novalidate class="md-layout" @submit.prevent="submitForm">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Users</div>
        </md-card-header>

        <md-card-content>
          <md-field>
            <label for="login">Email</label>
            <md-input type="email" name="login" id="login" v-model="login" />
          </md-field>

          <md-field>
            <label for="password">Senha</label>
            <md-input
              type="password"
              name="password"
              id="password"
              v-model="password"
            />
          </md-field>
        </md-card-content>

        <md-card-actions>
          <md-button type="submit" class="md-primary">Logar</md-button>
        </md-card-actions>
      </md-card>
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
