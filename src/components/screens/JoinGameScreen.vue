<template>
  <div class="join-game-screen">
    <JoinGame @join-lobby="handleJoinLobby" />
  </div>
</template>

<script>
import JoinGame from '../lobby/JoinGame.vue';

export default {
  components: { JoinGame },
  methods: {
    handleJoinLobby(data) {
      this.$emit('join-lobby', data);
    }
  }
};
</script>

<style scoped>
.join-game-screen {
  text-align: center;
  padding: 30px;
  background: linear-gradient(135deg, #f5e8c7, #d9b99b);
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
}
</style>