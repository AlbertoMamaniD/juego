<template>
  <!-- Sólo reenvía los eventos hacia App.vue -->
  <CreateGame
    :socket="socket"
    :lobby="lobby"
    @create-lobby="code => $emit('create-lobby', code)"
    @start-game ="code => $emit('start-game',  code)"
  />
</template>

<script setup>
/* global defineProps */
import CreateGame from '../lobby/CreateGame.vue'

defineProps({
  socket : Object,
  lobby  : Object
})
</script>

<style scoped>
/* pequeño relleno para esta pantalla */
:host {
  display: block;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5e8c7, #d9b99b);
}
</style>
