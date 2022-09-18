<script setup lang="ts">
import MinesweeperController from "../components/MinesweeperController.vue";
</script>

<template>
  <main class="minesweeper">
    <MinesweeperController />
  </main>
</template>

<style>
.minesweeper {
  padding-top: 20px;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
}

@media (min-width: 1024px) {
  .minesweeper {
    min-width: 60vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
