<script setup lang="ts">
import type { CellLocation, CellClickedEvent } from "../types/minesweeper";
import { CellState } from "../types/minesweeper";

defineProps<{
  loc: CellLocation;
  cellState: CellState;
  hint: number;
  disabled: boolean;
}>();

// minesweeperEmitter
defineEmits<{
  (e: "clicked", value: CellClickedEvent): void;
}>();
</script>

<template>
  <td class="minesweeper-cell" @click="emitClick(false)" @contextmenu.prevent="emitClick(true)" :class="cellClass">
    {{ cellContent }}
  </td>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    cellContent() {
      if (this.disabled && this.cellState == CellState.UntouchedBomb) return "b";
      if (this.cellState == CellState.Flagged) return "F";
      if (this.cellState == CellState.Unsure) return "?";

      if (this.cellState == CellState.Cleared && this.hint > 0) {
        return this.hint;
      }
      return "";
    },
    cellClass() {
      var cellClasses: string[] = [];
      if (this.disabled) cellClasses.push("disabled");
      const stateClassMap = new Map<CellState, string>([
        [CellState.Untouched, "untouched"],
        [CellState.UntouchedBomb, "untouched"],
        [CellState.Exploded, "exploded"],
        [CellState.Flagged, "flagged"],
        [CellState.Unsure, "unsure"],
        [CellState.Cleared, "cleared"],
      ]);

      var stateClass = stateClassMap.get(this.cellState);

      if (stateClass == undefined) {
        throw new Error(`Uh oh, we were supposed to know what the new cell class from ${this.cellState} would be`);
      }
      cellClasses.push(stateClass);
      return cellClasses;
    },
  },
  methods: {
    emitClick(isRightClick: boolean) {
      this.$emit("clicked", {
        loc: this.loc,
        isRightClick: isRightClick,
      });
    },
  },
});
</script>

<style scoped>
.minesweeper-cell {
  height: 2.5em;
  width: 2.5em;
  cursor: pointer;
  color: black;
  transition: 0.4s;
}

.minesweeper-cell.untouched:hover {
  background: hsla(184, 74%, 40%, 0.2);
}

.minesweeper-cell.disabled {
  filter: brightness(50%);
  cursor: default;
}

.minesweeper-cell.untouched {
  background: grey;
}

.minesweeper-cell.exploded {
  background: darkred;
}
.minesweeper-cell.flagged {
  background: lightblue;
}

.minesweeper-cell.unsure {
  background: orchid;
}

.minesweeper-cell.cleared {
  background: lightgreen;
}
</style>
