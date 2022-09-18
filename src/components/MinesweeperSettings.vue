<script setup lang="ts">
import type { GameSettings } from "@/types/minesweeper";

defineEmits<{
  (e: "new-game", value: GameSettings): void;
}>();
</script>

<template>
  <div class="settings">
    <table>
      <tr>
        <td>Size</td>
        <td>
          <select v-model="size">
            <option v-for="value in Size" :key="value" :value="value">
              {{ value }}
            </option>
          </select>
        </td>
        <td>Difficulty</td>
        <td>
          <select v-model="difficulty">
            <option v-for="value in Difficulty" :key="value" :value="value">
              {{ value }}
            </option>
          </select>
        </td>
        <td>
          <button @click="handleNewGameClick">New Game</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Difficulty, Size } from "@/types/minesweeper";

export default defineComponent({
  data() {
    return {
      difficulty: Difficulty.Easy,
      size: Size.Small,
    };
  },
  computed: {
    settings(): GameSettings {
      return {
        size: this.size,
        difficulty: this.difficulty,
      };
    },
  },
  methods: {
    handleNewGameClick() {
      this.$emit("new-game", this.settings);
    },
  },
});
</script>

<style scoped>
.settings {
  display: flex;
  justify-content: center;
  text-align: center;
}

@media (min-width: 1024px) {
  .settings {
    text-align: center;
  }
}
</style>
