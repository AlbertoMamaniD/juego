```vue
<template>
  <component
    :is="screens[currentScreen]"
    :socket="socket"
    :lobby="lobby"
    :playerId="playerId"
    :correctOption="correctOption"
    @navigate="nav"
    @create-lobby="createLobby"
    @start-game="startGame"
    @join-lobby="joinLobby"
    @submit-answer="submitAnswer"
  />
</template>

<script setup>
import { io } from 'socket.io-client'
import { ref, reactive } from 'vue'

import HomeScreen from '@/components/screens/HomeScreen.vue'
import CreateGameScreen from '@/components/screens/CreateGameScreen.vue'
import JoinGameScreen from '@/components/screens/JoinGameScreen.vue'
import GameScreen from '@/components/game/GameScreen.vue'
import GameResultsScreen from '@/components/game/GameResults.vue' // Cambiado de Results a GameResults

const screens = { HomeScreen, CreateGameScreen, JoinGameScreen, GameScreen, GameResultsScreen }
const currentScreen = ref('HomeScreen')

const lobby = reactive({
  code: null,
  players: [], // Array de { name, id, pieces }
  gameStarted: false,
  question: null,
  timeLeft: 0
})

const correctOption = ref(null)

const socket = io('http://localhost:3000')
const playerId = ref(socket.id)

socket.on('connect', () => { playerId.value = socket.id })
socket.on('update-players', players => {
  lobby.players = players.map(p => ({
    ...p,
    pieces: p.pieces || 0 // Todos los jugadores tienen piezas, inicializadas en 0
  }))
})
socket.on('game-started', () => { lobby.gameStarted = true; currentScreen.value = 'GameScreen' })
socket.on('new-question', q => {
  lobby.question = q
  correctOption.value = null
})
socket.on('update-timer', t => lobby.timeLeft = t)
socket.on('show-correct', ({ correctOption: opt, playerId: answeredPlayerId }) => {
  correctOption.value = opt
  // Incrementar piezas para el jugador que respondió correctamente
  const player = lobby.players.find(p => p.id === answeredPlayerId)
  if (player) {
    player.pieces = (player.pieces || 0) + 1
  }
})
socket.on('game-ended', players => {
  lobby.players = players
  // Limpiar localStorage al finalizar la partida
  localStorage.removeItem('hasJoined')
  localStorage.removeItem('playerName')
  // Navegar a la pantalla de resultados
  currentScreen.value = 'GameResultsScreen' // Cambiado de ResultsScreen a GameResultsScreen
})
socket.on('join-error', msg => alert(msg))

function nav(dest) {
  currentScreen.value = dest === 'create'
    ? 'CreateGameScreen'
    : dest === 'join'
      ? 'JoinGameScreen'
      : dest === 'results'
        ? 'GameResultsScreen' // Cambiado de ResultsScreen a GameResultsScreen
        : 'HomeScreen'
}

function createLobby(code) {
  socket.emit('create-lobby', code)
  socket.emit('join-lobby', { code, name: 'Anfitrión' })
  lobby.code = code
}
function startGame(code) { socket.emit('start-game', code) }
function joinLobby({ code, name }) {
  socket.emit('join-lobby', { code, name })
  lobby.code = code
}
function submitAnswer({ code, option, playerId }) {
  socket.emit('submit-answer', { code, option, playerId })
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  background: linear-gradient(135deg, #f5e8c7, #d9b99b);
  min-height: 100vh;
}
</style>
```