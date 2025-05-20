<template>
  <div class="create-game">
    <h1 class="title">Create a New Game</h1>

    <!-- 1. Generar código (sólo se desactiva tras generarlo) -->
   <button
  class="generate-btn"
  @click="generateLobbyCode"
  :disabled="!!lobbyCode"
>
  Generate Lobby Code
</button>

    <!-- Código visible -->
    <p v-if="lobbyCode" class="code-text">
      Lobby Code: <span class="code">{{ lobbyCode }}</span>
    </p>

    <!-- 2. Iniciar partida (mínimo 1 jugador en la lista) -->
    <button
      class="start-btn"
      @click="startGame"
      :disabled="!props.lobby.players.length"
    >
      Start Game
    </button>

    <PlayerList :players="props.lobby.players" />
  </div>
</template>

<script setup>
/* global defineProps, defineEmits */
import { ref } from 'vue'
import PlayerList from '../game/PlayerList.vue'

const props = defineProps({
  socket : Object,
  lobby  : Object
})
const emit = defineEmits(['create-lobby', 'start-game'])

const lobbyCode = ref('')

function generateLobbyCode () {
  lobbyCode.value = Math.random().toString(36).substr(2, 8).toUpperCase()
  emit('create-lobby', lobbyCode.value)  // sólo crea el lobby
}

function startGame () {
  if (props.lobby.players.length) emit('start-game', lobbyCode.value)
}
</script>

<style scoped>
.create-game {
  text-align: center;
  padding: 30px;
  background: linear-gradient(135deg, #f5e8c7, #d9b99b);
  min-height: 100vh;
  font-family: Arial, sans-serif;
}
.title {
  color: #4a2c2a;
  font-size: 2.5em;
  margin-bottom: 20px;
  font-weight: bold;
  text-transform: uppercase;
}
.generate-btn,
.start-btn {
  background: #8b4513;
  color: #fff;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.3s, background 0.3s;
  font-size: 1.1em;
  margin: 10px 5px;
}
.generate-btn:hover:not(:disabled),
.start-btn:hover:not(:disabled) {
  transform: scale(1.05);
  background: #6b2e0e;
}
.generate-btn,
.start-btn:disabled {
  background: #d3d3d3;
  cursor: not-allowed;
}
.code-text {
  margin: 20px 0 10px;
  font-size: 1.2em;
  color: #4a2c2a;
}
.code {
  font-weight: bold;
  color: #8b4513;
  letter-spacing: 2px;
}
</style>
