<template>
  <div class="player-list">
    <h3>Players</h3>
    <ul>
      <li v-for="player in players" :key="player.id" class="player-item">
        <span class="player-name">{{ player.name }}</span>
        <div class="player-status" :class="{ 'online': true }"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['players'],
  data() {
    return {};
  }
};
</script>

<style scoped>
.player-list {
  background: #fffaf0;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
.player-list h3 {
  color: #4a2c2a;
  font-size: 1.3em;
  margin-bottom: 10px;
}
.player-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f9f1e7;
  border-radius: 8px;
  margin: 5px 0;
  transition: background 0.3s;
}
.player-item:hover {
  background: #e8d8c8;
}
.player-name {
  color: #4a2c2a;
  font-size: 1.1em;
}
.player-status {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ccc;
}
.player-status.online {
  background: #2e7d32;
  animation: pulse 1.5s infinite;
}
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
</style>