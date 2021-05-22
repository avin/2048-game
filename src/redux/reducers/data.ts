import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppThunkAction } from '../configureStore';

import { generateCellKey, isAllowToMove, moveCells } from '@/utils/data';
import { randomArrayElement } from '@/utils/random';
import { BoardCell, Direction } from '@/types';

type DataState = {
	boardSize: number;
	score: number;
	lastMove: {
		score: number;
		boardCells: BoardCell[];
	} | null;
	isGameOver: boolean;
	isYouWin: boolean;
	isRestartGameAlerting: boolean;
	boardCells: BoardCell[];
};

const initialState: DataState = {
	boardSize: 4,
	score: 0,
	lastMove: null,
	isGameOver: false,
	isYouWin: false,
	isRestartGameAlerting: false,
	boardCells: [],
};

const slice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		resetGame: (state) => {
			state.boardCells = [];
			state.isGameOver = false;
			state.isYouWin = false;
			state.lastMove = null;
			state.isRestartGameAlerting = false;
			state.score = 0;
			return state;
		},
		generateNewCells: (state, action: PayloadAction<{ amount: number }>) => {
			const { amount } = action.payload;
			const freePositions: Omit<BoardCell, 'value'>[] = [];
			for (let y = 0; y < state.boardSize; y += 1) {
				for (let x = 0; x < state.boardSize; x += 1) {
					if (!state.boardCells.find((i) => i.x === x && i.y === y)) {
						freePositions.push({
							x,
							y,
							key: generateCellKey(),
							isNew: true,
						});
					}
				}
			}

			if (freePositions.length > 0) {
				for (let i = 0; i < Math.min(amount, freePositions.length); i += 1) {
					const freePosition = randomArrayElement(freePositions);

					if (freePosition !== undefined) {
						freePositions.splice(freePositions.indexOf(freePosition), 1);
					}

					state.boardCells.push({
						...freePosition,
						value: Math.random() > 0.75 ? 4 : 2,
					} as BoardCell);
				}
			}

			return state;
		},
		moveUp: (state) => {
			const result = moveCells(state.boardCells, state.boardSize, Direction.Up);
			[state.boardCells, state.isYouWin] = result;
			state.score += result[2];
			return state;
		},
		moveDown: (state) => {
			const result = moveCells(state.boardCells, state.boardSize, Direction.Down);
			[state.boardCells, state.isYouWin] = result;
			state.score += result[2];
			return state;
		},
		moveLeft: (state) => {
			const result = moveCells(state.boardCells, state.boardSize, Direction.Left);
			[state.boardCells, state.isYouWin] = result;
			state.score += result[2];
			return state;
		},
		moveRight: (state) => {
			const result = moveCells(state.boardCells, state.boardSize, Direction.Right);
			[state.boardCells, state.isYouWin] = result;
			state.score += result[2];
			return state;
		},
		cleanAfterMove: (state) => {
			state.boardCells = state.boardCells.reduce((p: BoardCell[], cell) => {
				if (!cell.toRemove) {
					delete cell.moved;
					delete cell.isMerged;
					delete cell.isNew;
					p.push(cell);
				}
				return p;
			}, []);

			return state;
		},
		setIsGameOver: (state, action: PayloadAction<{ value: boolean }>) => {
			const { value } = action.payload;
			state.isGameOver = value;
			return state;
		},
		setIsRestartGameAlerting: (state, action: PayloadAction<{ value: boolean }>) => {
			const { value } = action.payload;
			state.isRestartGameAlerting = value;
			return state;
		},
		setIsYouWin: (state, action: PayloadAction<{ value: boolean }>) => {
			const { value } = action.payload;
			state.isYouWin = value;
			return state;
		},
		saveLastMove: (state) => {
			state.lastMove = {
				score: state.score,
				boardCells: state.boardCells,
			};

			return state;
		},
		restoreLastMove: (state) => {
			if (state.lastMove) {
				state = {
					...state,
					...state.lastMove,
				};
				state.lastMove = null;
			}

			return state;
		},
	},
});

export const {
	resetGame,
	generateNewCells,
	moveUp,
	moveDown,
	moveLeft,
	moveRight,
	cleanAfterMove,
	setIsGameOver,
	setIsRestartGameAlerting,
	setIsYouWin,
	saveLastMove,
	restoreLastMove,
} = slice.actions;

export default slice.reducer;

export function restartGame(): AppThunkAction<void> {
	return (dispatch) => {
		dispatch(resetGame());
		dispatch(generateNewCells({ amount: 2 }));
	};
}

export function checkIsGameOver(): AppThunkAction<void> {
	return (dispatch, getState) => {
		const { boardCells, boardSize } = getState().data;
		const canMove =
			isAllowToMove(boardCells, boardSize, Direction.Up) ||
			isAllowToMove(boardCells, boardSize, Direction.Down) ||
			isAllowToMove(boardCells, boardSize, Direction.Left) ||
			isAllowToMove(boardCells, boardSize, Direction.Right);

		if (!canMove) {
			dispatch(setIsGameOver({ value: true }));
		}
	};
}
