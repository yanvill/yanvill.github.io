<script setup lang="ts">
import MinesweeperGrid from "@/components/MinesweeperGrid.vue";
import MinesweeperSettings from "@/components/MinesweeperSettings.vue";
</script>

<template>
  <div class="controller">
    <MinesweeperSettings @new-game="setupGame" />
    <MinesweeperGrid
      :game-board="gameBoard"
      :hints="gameHints"
      :disabled="gameDisabled"
      @cell-clicked="handleCellClicked"
    />
  </div>
</template>

<script lang="ts">
import { CellState, DefaultsSettings } from "../types/minesweeper";
import type { CellClickedEvent, GameSettings } from "../types/minesweeper";
import BoardUtility from "@/utils/MinesweeperBoardUtility";
import { defineComponent } from "vue";

const INITIAL_UTILITY = new BoardUtility(DefaultsSettings);

export default defineComponent({
  data() {
    return {
      boardUtility: INITIAL_UTILITY,
      gameBoard: INITIAL_UTILITY.board,
      gameHints: INITIAL_UTILITY.hints,
      gameDisabled: false,
    };
  },
  computed: {
    cells() {
      return this.gameBoard.reduce((acc, val) => acc.concat(val), []);
    },
    gameInProgress(): boolean {
      if (this.gameDisabled) return false;
      let untouchedCount = this.cells.filter((cell) => {
        return cell == CellState.Untouched || cell == CellState.UntouchedBomb;
      }).length;

      return untouchedCount != this.cells.length;
    },
  },
  methods: {
    setupGame(settings: GameSettings) {
      let startNewGame: boolean = true;

      if (this.gameInProgress) {
        startNewGame = confirm("Are you sure you want to start a new game?");
      }

      if (startNewGame) {
        this.boardUtility = new BoardUtility(settings);
        this.gameBoard = this.boardUtility.board;
        this.gameHints = this.boardUtility.hints;
        this.gameDisabled = false;
      }
    },
    handleCellClicked(event: CellClickedEvent) {
      if (this.gameDisabled) return;

      if (event.isRightClick) {
        this.handleRightClick(...event.loc);
      } else {
        this.handleLeftClick(...event.loc);
      }
    },
    handleLeftClick(x: number, y: number) {
      const nextStateMap = new Map<CellState, CellState>([
        [CellState.Untouched, CellState.Cleared],
        [CellState.UntouchedBomb, CellState.Exploded],
      ]);

      var current = this.gameBoard[x][y];
      var next = nextStateMap.get(current);

      if (next == undefined) return;

      this.gameBoard[x][y] = next;
      if (next == CellState.Exploded) this.handleExplosion();

      this.checkGameCleared();

      if (this.gameHints[x][y] == 0) {
        this.boardUtility.getAdjacentCells(x, y).forEach((loc) => {
          this.handleLeftClick(...loc);
        });
      }
    },
    handleRightClick(x: number, y: number) {
      const nextStateMap = new Map<CellState, CellState>([
        [CellState.Untouched, CellState.Flagged],
        [CellState.UntouchedBomb, CellState.Flagged],
        [CellState.Flagged, CellState.Unsure],
        [CellState.Unsure, CellState.Untouched],
      ]);

      var current = this.gameBoard[x][y];
      var next = nextStateMap.get(current);

      if (next == undefined) return;

      this.gameBoard[x][y] = next;
    },
    handleExplosion() {
      this.gameDisabled = true;
    },
    checkGameCleared() {
      let clearedCount = this.cells.filter((cell) => {
        return cell == CellState.Cleared || cell == CellState.Flagged || cell == CellState.Unsure;
      }).length;
      let bombCount = this.cells.filter((cell) => {
        return cell == CellState.UntouchedBomb;
      }).length;

      if (bombCount + clearedCount == this.cells.length) {
        this.handleGameCleared();
      }
    },
    handleGameCleared() {
      this.gameDisabled = true;
    },
  },
});
</script>
