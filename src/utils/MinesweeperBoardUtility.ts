import { CellState, SizeMap, DifficultyBombPercentageMap } from "@/types/minesweeper";
import type { GameSettings, GameBoard, GameHints, CellLocation } from "../types/minesweeper";
import { getRandomInteger } from "../utils/RandomNumberGenerator";

export default class BoardUtility {
  board: GameBoard;
  height: number;
  width: number;
  hints: GameHints;

  constructor(settings: GameSettings) {
    const sizes = SizeMap.get(settings.size);
    const percentBombs = DifficultyBombPercentageMap.get(settings.difficulty);

    if (sizes == undefined) throw Error(`Unknown game size ${settings.size}`);
    if (percentBombs == undefined) throw Error(`Unknown game difficulty ${settings.difficulty}`);

    const height = sizes[0];
    const width = sizes[1];
    const numBombs = Math.round(height * width * percentBombs);

    console.log(`For ${height * width} cells and ${percentBombs}, num bombs: ${numBombs}`);

    const board = this.create2dArray(height, width, CellState.Untouched) as GameBoard;
    let numBombsCreated = 0;

    while (numBombsCreated < numBombs) {
      const x = getRandomInteger(1, width - 1);
      const y = getRandomInteger(1, height - 1);

      if (board[x][y] != CellState.UntouchedBomb) {
        board[x][y] = CellState.UntouchedBomb;
        numBombsCreated++;
      }
    }

    this.board = board;
    this.height = board[0].length;
    this.width = board.length;
    this.hints = this.createHints();
  }

  public getAdjacentCells(x: number, y: number): CellLocation[] {
    let adjacentCells: CellLocation[] = [
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],
      [x - 1, y],
      [x + 1, y],
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
    ];

    adjacentCells = adjacentCells.filter((cellLoc) => {
      const validX = cellLoc[0] >= 0 && cellLoc[0] < this.width;
      const validY = cellLoc[1] >= 0 && cellLoc[1] < this.height;
      return validX && validY;
    });
    return adjacentCells;
  }

  private create2dArray(height: number, width: number, value: any): any[] {
    return Array.from({ length: width }, () => Array.from({ length: height }, () => value));
  }

  private createHints(): GameHints {
    const hints = this.create2dArray(this.height, this.width, CellState.Untouched) as GameHints;

    for (let x = 0; x < hints.length; x++) {
      for (let y = 0; y < hints[x].length; y++) {
        hints[x][y] = this.countNumBombsAround(x, y);
      }
    }

    return hints;
  }

  private isBomb(x: number, y: number): boolean {
    const validStates = [CellState.UntouchedBomb, CellState.Exploded];
    const isBomb = validStates.includes(this.board[x][y]);

    if (isBomb) {
      // console.table(this.board)
      // console.log(`Cell ${x},${y} is a bomb: ${validStates.includes(this.board[x][y])}`)
      // console.log(CellState[this.board[x][y]], this.board[x][y])
    }

    return isBomb;
  }

  private countNumBombsAround(x: number, y: number): number {
    const filteredLocs = this.getAdjacentCells(x, y).filter((loc) => {
      return this.isBomb(loc[0], loc[1]);
    });

    return filteredLocs.length;
  }
}
