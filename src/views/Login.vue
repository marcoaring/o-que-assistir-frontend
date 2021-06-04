<template>
  <v-container class="grey lighten-4" fluid fill-height>
    <v-row class="align-center justify-center" no-gutters>
      <v-col align-self="center" xs="12" sm="7" md="5" lg="3">
        <v-card class="pa-8 pt-3" outlined tile>
          <h1 class="text-uppercase text-center mb-8">O que assistir?</h1>

          <form @submit.prevent="submitForm">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              color="cyan darken-1"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="show1 ? 'text' : 'password'"
              class="mb-4"
              label="Senha"
              color="cyan darken-1"
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-alert dense outlined type="error" v-if="error">
              {{ error }}
            </v-alert>

            <v-btn
              :disabled="$v.$invalid"
              block
              color="cyan accent-4"
              type="submit"
              >Logar</v-btn
            >
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "Login",
  mixins: [validationMixin],
  validations: {
    password: { required },
    email: { required, email },
  },
  data: () => ({
    show1: false,
    email: "",
    password: "",
    error: "",
    emailRules: [
      (v) => !!v || "O e-mail é obrigatório.",
      (v) => /.+@.+/.test(v) || "O e-mail precisa ser válido.",
    ],
    passwordRules: [
      (v) => !!v || "A senha é obrigatória.",
      // (v) => v.length >= 8 || "Min 8 characters",
      // emailMatch: () => `The email and password you entered don't match`,
    ],
  }),
  methods: {
    async submitForm() {
      try {
        const result = (
          await axios.post(`${process.env.VUE_APP_API_URL}authenticate`, {
            email: this.email,
            password: this.password,
          })
        ).data;

        localStorage.token = result.token;
        this.$router.push("/");
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>
