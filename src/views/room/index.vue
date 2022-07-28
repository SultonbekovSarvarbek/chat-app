<template>
  <div>
    <div class="room-messages">
      <div v-for="messageItem in messages" :key="messageItem.id">
        <strong>{{ messageItem.user.username }} </strong>:
        {{ messageItem.text }}
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
import { getToken } from "@/utils/auth";
export default {
  name: "RoomPage",
  data() {
    return {
      roomId: this.$route.params.id,
      message: "",
      messages: [],
      chatSocket: null,
    };
  },
  methods: {
    ...mapActions("chat", ["getRoomMessages"]),
    sendMessage() {
      this.chatSocket.send(
        JSON.stringify({
          type: "new",
          body: {
            text: this.message,
          },
        })
      );
      this.message = "";
    },
    async fetchMessages() {
      try {
        await this.getRoomMessages(this.roomId);
        this.messages = [...this.roomMessages];
      } catch (error) {
        return error;
      }
    },
  },
  computed: {
    ...mapState("chat", ["rooms", "roomMessages"]),
  },

  async created() {
    await this.fetchMessages();
  },
  mounted() {
    this.chatSocket = new WebSocket(
      `ws://0.0.0.0:8000/ws/chat/room/${this.roomId}/?token=${getToken()}`
    );
    this.chatSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      this.messages.push(data.body);
    };
    this.chatSocket.onclose = () => {
      console.error("chat socket closed!");
    };
  },
};
</script>

<style></style>
