<template>
  <v-card class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>Login</v-card-title>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <form>
        <v-text-field
          label="Username"
          v-model="form.username"
          outlined
        ></v-text-field>

        <v-text-field
          label="Password"
          outlined
          v-model="form.password"
          name="password"
          autocomplete="on"
          :type="showpassword ? 'text' : 'password'"
          :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showpassword = !showpassword"
        >
        </v-text-field>
      </form>
    </v-card-text>

    <v-card-text class="d-flex align-center justify-space-between">
      Don’t have an account ?
      <v-btn color="primary" small to="/register">
        <span class="mr-2">Register</span>
        <v-icon>mdi-account-plus</v-icon>
      </v-btn></v-card-text
    >
    <v-card-actions>
      <v-btn color="primary" small @click="submitLoginForm">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SingIn",
  data() {
    return {
      showpassword: false,
      password: "Password",
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions("user", ["login"]),
    async submitLoginForm() {
      try {
        await this.login(this.form).then(() => {
          this.$router.push("/chat");
        });
      } catch (error) {
        return error;
      }
    },
  },
};
</script>
