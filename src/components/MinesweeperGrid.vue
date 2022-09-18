<script setup lang="ts">
import { GameStatus, type CellClickedEvent, type GameBoard, type GameHints } from "../types/minesweeper";
import MinesweeperCell from "./MinesweeperCell.vue";

defineProps<{
  gameBoard: GameBoard;
  hints: GameHints;
  disabled: boolean;
  gameStatus: GameStatus;
}>();

defineEmits<{
  (e: "cell-clicked", value: CellClickedEvent): void;
}>();
</script>

<template>
  <div class="minesweeper-grid" :class="tableClass">
    <table>
      <tr v-for="i in gameBoard.length" :key="`row-${i}`" :id="`row-${i}`">
        <MinesweeperCell
          v-for="j in gameBoard[0].length"
          :id="`col-${j}`"
          :loc="[i - 1, j - 1]"
          :key="`col-${j}`"
          :cellState="gameBoard[i - 1][j - 1]"
          :hint="hints[i - 1][j - 1]"
          :disabled="disabled"
          @clicked="handleCellClicked"
        />
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    MinesweeperCell: MinesweeperCell,
  },
  computed: {
    tableClass() {
      return {
        won: this.gameStatus == GameStatus.Won,
        lost: this.gameStatus == GameStatus.Lost,
        "rotating-border": this.disabled,
      };
    },
  },
  methods: {
    handleCellClicked(event: CellClickedEvent) {
      this.$emit("cell-clicked", event);
    },
  },
});
</script>

<style scoped>
.minesweeper-grid {
  padding-top: 20px;
  display: flex;
  justify-content: center;
  text-align: center;
  transition: 0.6s linear;
  --border-radius: 1rem;
  --border-size: 0.5rem;
}

@keyframes spin {
  from {transform: translate(-50%, -50%) rotate(0);}
  to   {transform: translate(-50%, -50%) rotate(360deg);}
}

@keyframes spin {
  from {transform: translate(-50%, -50%) rotate(0);}
  to   {transform: translate(-50%, -50%) rotate(360deg);}
}

.rotating-border.won {
  --border-bg: conic-gradient(green, lime, darkgreen, lime);
}

.rotating-border.lost {
  --border-bg: conic-gradient(red, orange, darkred, red);
}

.rotating-border {
  --border-bg: conic-gradient(red, yellow, lime, aqua, blue, magenta, red);
  --padding: 1rem;
  position: relative;
  overflow: hidden;
  padding: calc(var(--padding) + var(--border-size));
  border-radius: var(--border-radius);
  display: inline-block;
}

.rotating-border::before {
  content: "";
  display: block;
  background: var(--border-bg);
  width: calc(100% * 1.41421356237);
  padding-bottom: calc(100% * 1.41421356237);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 100%;
  z-index: -2;
  -webkit-animation: spin 5s linear infinite;
  animation: spin 2s linear infinite;
}

.rotating-border::after {
  content: '';
  position: absolute;
  top: var(--border-size);
  right: var(--border-size);
  bottom: var(--border-size);
  left: var(--border-size);
  background: white;
  z-index: -1;
  border-radius: calc(var(--border-radius) - var(--border-size));
}

@media (min-width: 1024px) {
  .minesweeper-grid {
    text-align: center;
  }
}
</style>
