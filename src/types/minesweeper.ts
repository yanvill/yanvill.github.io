// Probably a better way to do this with a .d.ts file

export enum CellState {
  Untouched = "Untouched",
  UntouchedBomb = "Bomb",
  Exploded = "Exploded",
  Flagged = "Flagged",
  Unsure = "Unsure",
  Cleared = "Cleared",
}

export enum GameStatus {
  New = "New",
  InProgress = "InProgress",
  Won = "Success",
  Lost = "Lost",
}

export enum Difficulty {
  Hard = "Hard",
  Medium = "Medium",
  Easy = "Easy",
}

export enum Size {
  Large = "Large",
  Medium = "Medium",
  Small = "Small",
}

export const SizeMap = new Map<Size, [number, number]>([
  [Size.Large, [20, 20]],
  [Size.Medium, [15, 15]],
  [Size.Small, [10, 10]],
]);

export const DifficultyBombPercentageMap = new Map<Difficulty, number>([
  [Difficulty.Hard, 0.4],
  [Difficulty.Medium, 0.2],
  [Difficulty.Easy, 0.05],
]);

export const DefaultsSettings = {
  size: Size.Small,
  difficulty: Difficulty.Easy,
};

export type GameBoard = CellState[][];

export type GameHints = number[][];

export type CellLocation = [number, number];

export interface CellClickedEvent {
  loc: CellLocation;
  isRightClick: boolean;
}

export interface GameSettings {
  size: Size;
  difficulty: Difficulty;
}
