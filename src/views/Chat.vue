<template>
  <div>
    <div class="chat-users mt-5">
      <h2>All Users</h2>
      <div v-for="user in users" :key="user.id">
        {{ user.username }}
      </div>
    </div>
    <div class="chat-rooms mt-5">
      <h2>Rooms</h2>
      <div v-if="rooms && rooms.length">
        <div v-for="room in rooms" :key="room.id">
          <router-link :to="`/room/${room.id}`"
            >Room number: {{ room.id }}</router-link
          >
        </div>
      </div>
      <div v-else>no rooms</div>
    </div>
    <div class="mt-5">
      <h2>Create room</h2>
      <v-form @submit.prevent="createForm">
        <v-select
          :items="users"
          item-text="username"
          item-value="id"
          label="Users"
          outlined
          multiple
          v-model="member_ids"
        ></v-select>
        <v-btn
          elevation="1"
          type="submit"
          :disabled="!member_ids.length"
          outlined
          >Create room</v-btn
        >
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ChatPage",
  data() {
    return {
      member_ids: [],
    };
  },
  async created() {
    await this.getUsers();
    await this.getRooms();
  },
  methods: {
    ...mapActions("chat", ["getUsers", "getRooms", "createdRoom"]),
    async createForm() {
      try {
        await this.createdRoom(this.member_ids);
        await this.getRooms();
      } catch (error) {
        return error;
      } finally {
        this.member_ids = [];
      }
    },
  },
  computed: {
    ...mapState("chat", ["users", "rooms"]),
  },
};
</script>
