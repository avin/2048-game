import immer from 'immer';
import {
	RESET_GAME,
	GENERATE_NEW_CELLS,
	MOVE_DOWN,
	MOVE_LEFT,
	MOVE_RIGHT,
	MOVE_UP,
	CLEAN_AFTER_MOVE,
	SET_IS_GAME_OVER,
	SET_IS_YOU_WIN,
	SET_IS_RESTART_GAME_ALERTING,
	SAVE_LAST_MOVE,
	RESTORE_LAST_MOVE,
} from './actionTypes';
import { randomArrayElement } from '../../../utils/random';
import { generateCellKey, moveCells } from '../../../utils/data';

const initialState = {
	boardSize: 4,
	score: 0,
	lastMove: null,
	isGameOver: false,
	isYouWin: false,
	isRestartGameAlerting: false,
	boardCells: [],
};

export default function reducer(state = initialState, action = {}) {
	return immer(state, state => {
		switch (action.type) {
			case RESET_GAME: {
				state.boardCells = [];
				state.isGameOver = false;
				state.isYouWin = false;
				state.lastMove = null;
				state.isRestartGameAlerting = false;
				state.score = 0;
				return state;
			}
			case GENERATE_NEW_CELLS: {
				const { amount } = action;
				const freePositions = [];
				for (let y = 0; y < state.boardSize; y += 1) {
					for (let x = 0; x < state.boardSize; x += 1) {
						if (!state.boardCells.find(i => i.x === x && i.y === y)) {
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

						freePositions.splice(freePositions.indexOf(freePosition), 1);

						state.boardCells.push({
							...freePosition,
							value: Math.random() > 0.75 ? 4 : 2,
						});
					}
				}

				return state;
			}
			case MOVE_UP: {
				const result = moveCells(state.boardCells, state.boardSize, 'up');
				[state.boardCells, state.isYouWin] = result;
				state.score += result[2];
				return state;
			}
			case MOVE_DOWN: {
				const result = moveCells(state.boardCells, state.boardSize, 'down');
				[state.boardCells, state.isYouWin] = result;
				state.score += result[2];
				return state;
			}
			case MOVE_LEFT: {
				const result = moveCells(state.boardCells, state.boardSize, 'left');
				[state.boardCells, state.isYouWin] = result;
				state.score += result[2];
				return state;
			}
			case MOVE_RIGHT: {
				const result = moveCells(state.boardCells, state.boardSize, 'right');
				[state.boardCells, state.isYouWin] = result;
				state.score += result[2];
				return state;
			}
			case CLEAN_AFTER_MOVE: {
				state.boardCells = state.boardCells
					.filter(cell => !cell.toRemove)
					.map(cell => {
						delete cell.moved;
						delete cell.isMerged;
						delete cell.isNew;
						return cell;
					});

				return state;
			}
			case SET_IS_GAME_OVER: {
				const { value } = action;
				state.isGameOver = value;
				return state;
			}
			case SET_IS_RESTART_GAME_ALERTING: {
				const { value } = action;
				state.isRestartGameAlerting = value;
				return state;
			}
			case SET_IS_YOU_WIN: {
				const { value } = action;
				state.isYouWin = value;
				return state;
			}
			case SAVE_LAST_MOVE: {
				state.lastMove = {
					score: state.score,
					boardCells: state.boardCells,
				};

				return state;
			}
			case RESTORE_LAST_MOVE: {
				if (state.lastMove) {
					state = {
						...state,
						...state.lastMove,
					};
					state.lastMove = null;
				}

				return state;
			}
			default:
				return state;
		}
	});
}
