```vue
<template>
  <div class="results-screen">
    <h1 class="title">Resultados Finales</h1>
    <div class="results-content">
      <h2>¡Juego Terminado!</h2>
      <div class="leaderboard">
        <h3>Tabla de Clasificación Final</h3>
        <ul>
          <li v-for="player in sortedPlayers" :key="player.id" class="leader-item">
            <span class="leader-name">{{ player.name }}</span>
            <span class="leader-score">{{ player.pieces }} piezas</span>
          </li>
        </ul>
      </div>
      <button class="return-btn" @click="returnToHome">Regresar al Inicio</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameResults', // Especificamos el nombre del componente
  props: ['lobby'],
  computed: {
    sortedPlayers() {
      return [...this.lobby.players].sort((a, b) => (b.pieces || 0) - (a.pieces || 0));
    }
  },
  methods: {
    returnToHome() {
      this.$emit('navigate', 'home');
    }
  }
};
</script>

<style scoped>
.results-screen {
  text-align: center;
  padding: 30px;
  background: linear-gradient(135deg, #f5e8c7, #d9b99b);
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
}
.title {
  color: #4a2c2a;
  font-size: 2.5em;
  margin-bottom: 20px;
  font-weight: bold;
  text-transform: uppercase;
}
.results-content {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}
.results-content h2 {
  color: #4a2c2a;
  font-size: 1.8em;
  margin-bottom: 20px;
}
.leaderboard {
  margin-top: 20px;
}
.leaderboard h3 {
  color: #4a2c2a;
  font-size: 1.3em;
  margin-bottom: 10px;
}
.leader-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #f9f1e7;
  border-radius: 8px;
  margin: 5px 0;
  transition: background 0.3s;
}
.leader-item:hover {
  background: #e8d8c8;
}
.leader-name, .leader-score {
  color: #4a2c2a;
  font-size: 1.1em;
}
.return-btn {
  background: #8b4513;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.3s, background 0.3s;
  font-size: 1.1em;
  margin-top: 20px;
}
.return-btn:hover {
  transform: scale(1.05);
  background: #6b2e0e;
}
</style>
```