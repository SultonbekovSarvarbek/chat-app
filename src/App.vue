<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn href="https://dteam.dev/" target="_blank" text>
        <span class="mr-2">:DTeam</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn to="/" class="mr-5">
        <span class="mr-2">Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn to="/login" class="mr-5" v-if="!isAuthenticated">
        <span class="mr-2">Login</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn to="/register" v-if="!isAuthenticated">
        <span class="mr-2">Register</span>
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
      <div v-if="isAuthenticated">
        <span
          >Welcome <strong>{{ userInfo.username }}</strong></span
        >
      </div>
      <v-btn class="ml-5" to="/chat" v-if="isAuthenticated">
        <span class="mr-2">Chat</span>
        <v-icon>mdi-message-bulleted</v-icon>
      </v-btn>
      <v-btn class="ml-5" @click="logoutFromApp" v-if="isAuthenticated">
        <span class="mr-2">Log out</span>
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState("user", ["isAuthenticated", "userInfo"]),
  },
  methods: {
    ...mapActions("user", ["logout"]),
    logoutFromApp() {
      this.logout();
      this.$router.push("/login");
    },
  },
};
</script>
