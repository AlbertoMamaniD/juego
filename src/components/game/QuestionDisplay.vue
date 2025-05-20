<template>
  <div class="question-display">
    <p class="question-text">{{ question ? question.text : 'Waiting for question...' }}</p>
    <div class="options-grid">
      <button
        v-for="option in question?.options"
        :key="option.id"
        @click="selectOption(option)"
        :disabled="timeLeft <= 0 || answered || showCorrect"
        class="option-btn"
        :class="{
          correct: showCorrect && correctOption && option.id === correctOption.id,
          incorrect: showCorrect && answered && selectedOption?.id === option.id && !option.correct
        }"
      >
        {{ option.text }}
        <span v-if="showCorrect && correctOption && option.id === correctOption.id" style="margin-left:8px;">✔️</span>
      </button>
    </div>
    <div v-if="showCorrect && correctOption" class="correct-answer">
      <p>Respuesta correcta: <b>{{ correctOption.text }}</b></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['question', 'timeLeft', 'correctOption'],
  data() {
    return {
      answered: false,
      selectedOption: null,
      showCorrect: false
    };
  },
  watch: {
    question() {
      this.answered = false;
      this.selectedOption = null;
      this.showCorrect = false;
    },
    timeLeft(newVal) {
      if (newVal === 0 && this.question) {
        this.showCorrect = true;
      }
    },
    correctOption(newVal) {
      if (newVal) {
        this.showCorrect = true;
      }
    }
  },
  methods: {
    selectOption(option) {
      if (this.timeLeft > 0 && !this.answered && !this.showCorrect) {
        this.answered = true;
        this.selectedOption = option;
        this.$emit('submit-answer', option);
      }
    }
  }
};
</script>

<style scoped>
.question-display {
  text-align: center;
  padding: 20px;
}
.question-text {
  font-size: 1.3em;
  color: #4a2c2a;
  margin-bottom: 20px;
  font-weight: bold;
}
.options-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}
.option-btn {
  background: #8b4513;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 15px;
  cursor: pointer;
  transition: transform 0.3s, background 0.3s;
  font-size: 1em;
}
.option-btn.correct {
  background: #2e7d32 !important;
  color: #fff;
}
.option-btn.incorrect {
  background: #d32f2f !important;
  color: #fff;
}
.option-btn:hover:not(:disabled) {
  transform: scale(1.05);
  background: #6b2e0e;
}
.option-btn:disabled {
  background: #d3d3d3;
  cursor: not-allowed;
}
.correct-answer {
  margin-top: 18px;
  color: #2e7d32;
  font-weight: bold;
  font-size: 1.1em;
}
</style>