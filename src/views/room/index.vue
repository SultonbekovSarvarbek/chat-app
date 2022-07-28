<template>
  <div>
    <v-btn
      elevation="1"
      color="primary"
      small
      class="mb-5"
      @click="goBackToRooms"
      >Go Back (Rooms)</v-btn
    >
    <div class="room-messages">
      <div v-if="messages && messages.length">
        <div v-for="messageItem in messages" :key="messageItem.id">
          <div class="d-flex align-center justify-space-between mb-2">
            <div>
              <strong>{{ messageItem.user.username }} </strong>
              <small v-if="userInfo.username === messageItem.user.username"
                >yourself</small
              >:
              {{ messageItem.text }}
            </div>
            <v-btn
              v-if="userInfo.username === messageItem.user.username"
              elevation="1"
              small
              color="error"
              @click="deleteMessage(messageItem.id)"
              >delete</v-btn
            >
          </div>
        </div>
      </div>
      <div v-else>
        <p>No messages</p>
      </div>
    </div>
    <v-form @submit.prevent="sendMessage">
      <div class="d-flex align-center justify-space-between">
        <v-text-field
          v-model.trim="message"
          dense
          outlined
          placeholder="your message"
          hide-details="auto"
        ></v-text-field>
        <v-btn
          class="ml-3"
          elevation="1"
          :disabled="!message.length"
          type="submit"
          color="primary"
          >Send</v-btn
        >
      </div>
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
    deleteMessage(messageId) {
      this.chatSocket.send(
        JSON.stringify({
          type: "delete",
          body: {
            id: messageId,
          },
        })
      );
    },
    goBackToRooms() {
      this.$router.push("/chat");
    },
    async fetchMessages() {
      try {
        await this.getRoomMessages(this.roomId).then((res) => {
          this.messages = [...res.data];
        });
      } catch (error) {
        return error;
      }
    },
  },
  computed: {
    ...mapState("chat", ["rooms", "roomMessages"]),
    ...mapState("user", ["userInfo"]),
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
      if (data.type === "delete") {
        this.messages = this.messages.filter(
          (item) => item.id !== data.body.id
        );
      } else {
        this.messages.push(data.body);
      }
    };
    this.chatSocket.onclose = () => {
      alert("Error, chat socket closed!");
    };
  },
};
</script>

<style></style>
