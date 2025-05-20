<template>
  <div class="game-screen">
    <h1 class="title">Las Primeras Comunidades de Fe</h1>
    <div v-if="lobby.gameStarted" class="game-content">
      <div class="question-box">
        <QuestionDisplay
          :question="lobby.question"
          :timeLeft="lobby.timeLeft"
          :correctOption="correctOption"
          @submit-answer="submitAnswer"
        />
        <div class="timer">
          <p>Time Left: <span class="time">{{ Math.max(lobby.timeLeft, 0) }}s</span></p>
        </div>
      </div>
      <ChurchBuilder :pieces="myPieces" />
      <div class="leaderboard">
        <h3>Leaderboard</h3>
        <ul>
          <li v-for="player in lobby.players" :key="player.id" class="leader-item">
            <span class="leader-name">{{ player.name }}</span>
            <span class="leader-score">{{ player.pieces }} pieces</span>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="waiting">
      <h2>Waiting for host to start...</h2>
      <PlayerList :players="lobby.players" />
    </div>
  </div>
</template>

<script>
import QuestionDisplay from './QuestionDisplay.vue';
import ChurchBuilder from './ChurchBuilder.vue';
import PlayerList from './PlayerList.vue';

export default {
  components: { QuestionDisplay, ChurchBuilder, PlayerList },
  props: ['lobby', 'socket', 'playerId', 'correctOption'],
  computed: {
    myPieces() {
      const player = this.lobby.players.find(p => p.id === this.playerId);
      return player ? player.pieces : 0;
    }
  },
  methods: {
    submitAnswer(option) {
      if (this.lobby.timeLeft > 0) {
        this.socket.emit('submit-answer', {
          code: this.lobby.code,
          option,
          playerId: this.playerId
        });
      }
    }
  }
};
</script>

<style scoped>
.game-screen {
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
.game-content {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}
.question-box {
  margin-bottom: 20px;
}
.timer {
  margin: 15px 0;
  font-size: 1.2em;
}
.time {
  font-weight: bold;
  color: #d32f2f;
  animation: blink 1s infinite;
}
@keyframes blink {
  50% { opacity: 0.5; }
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
.waiting h2 {
  color: #4a2c2a;
  font-size: 1.5em;
}
</style>