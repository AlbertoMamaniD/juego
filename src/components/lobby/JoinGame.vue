<template>
  <div class="join-game">
    <h1 class="title">Join a Game</h1>
    <input v-model="code" placeholder="Enter Lobby Code" class="input-field" />
    <input v-model="playerName" placeholder="Enter Your Name" class="input-field" />
    <button class="join-btn" @click="joinLobby">
      <span>Join Lobby</span>
    </button>
    <p v-if="error" class="error-text">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: '',
      playerName: '',
      error: ''
    };
  },
  methods: {
    joinLobby() {
      if (this.code && this.playerName) {
        this.$emit('join-lobby', { code: this.code, name: this.playerName });
        this.error = '';
      } else {
        this.error = 'Please enter a code and your name.';
      }
    }
  }
};
</script>

<style scoped>
.join-game {
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
.input-field {
  display: block;
  width: 60%;
  max-width: 300px;
  margin: 15px auto;
  padding: 12px;
  border: 2px solid #8b4513;
  border-radius: 25px;
  font-size: 1.1em;
  transition: border-color 0.3s;
}
.input-field:focus {
  outline: none;
  border-color: #6b2e0e;
}
.join-btn {
  background: #8b4513;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.3s, background 0.3s;
  font-size: 1.1em;
}
.join-btn:hover {
  transform: scale(1.05);
  background: #6b2e0e;
}
.error-text {
  color: #d32f2f;
  font-size: 1em;
  margin-top: 10px;
}
</style>