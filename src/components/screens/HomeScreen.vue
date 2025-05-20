<template>
  <div class="home-screen">
    <h1 class="title">Las Primeras Comunidades de Fe</h1>
    <button class="create-btn" @click="goToCreate">Create Game</button>
    <button class="join-btn" @click="goToJoin">Join Game</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToCreate() {
      this.$emit('navigate', 'create');
    },
    goToJoin() {
      this.$emit('navigate', 'join');
    }
  }
};
</script>

<style scoped>
.home-screen {
  text-align: center;
  padding: 30px;
  background: linear-gradient(135deg, #f5e8c7, #d9b99b);
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
}
.title {
  color: #4a2c2a;
  font-size: 3em;
  margin-bottom: 40px;
  font-weight: bold;
  text-transform: uppercase;
}
.create-btn, .join-btn {
  background: #8b4513;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.3s, background 0.3s;
  font-size: 1.2em;
  margin: 10px;
}
.create-btn:hover, .join-btn:hover {
  transform: scale(1.05);
  background: #6b2e0e;
}
</style>