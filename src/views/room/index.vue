<template>
  <div>
    <div class="room-messages">
      <div v-if="roomMessages && roomMessages.length">
        <div v-for="message in roomMessages" :key="message.id">
          <strong>{{ message.user.username }} </strong>: {{ message.text }}
        </div>
      </div>
      <div v-else>
        <span>No messages</span>
      </div>
    </div>
    <v-form @submit.prevent="sendMessage">
      <v-text-field
        v-model="message"
        dense
        outlined
        hide-details="auto"
      ></v-text-field>
      <v-btn elevation="1" type="submit">Send</v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "RoomPage",
  data() {
    return {
      roomId: this.$route.params.id,
      message: "",
      messages: [],
    };
  },
  methods: {
    ...mapActions("chat", ["getRoomMessages"]),
    sendMessage() {
      console.log("send message");
    },
  },
  computed: {
    ...mapState("chat", ["rooms", "roomMessages"]),
  },
  async created() {
    try {
      await this.getRoomMessages(this.roomId);
    } catch (error) {
      return error;
    }
  },
};
</script>

<style></style>
