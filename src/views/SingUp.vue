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

    <v-card-title>Register</v-card-title>
    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <form>
        <v-text-field label="First name" v-model="form.first_name" outlined>
        </v-text-field>
        <v-text-field label="Last name" v-model="form.last_name" outlined>
        </v-text-field>
        <v-text-field label="Username" v-model="form.username" outlined>
        </v-text-field>
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
    <v-card-actions>
      <v-btn color="primary" small @click="submitRegisterForm"> Submit </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SingUp",
  data() {
    return {
      showpassword: false,
      password: "Password",
      form: {
        username: "",
        password: "",
        first_name: "",
        last_name: "",
      },
    };
  },
  methods: {
    ...mapActions("user", ["register"]),
    async submitRegisterForm() {
      try {
        await this.register(this.form).then(() => {
          this.$router.push("/login");
        });
      } catch (error) {
        return error;
      }
    },
  },
};
</script>

<style></style>
