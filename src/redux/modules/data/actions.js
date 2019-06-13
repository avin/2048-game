import {
	CLEAN_AFTER_MOVE,
	GENERATE_NEW_CELLS,
	MOVE_DOWN,
	MOVE_LEFT,
	MOVE_RIGHT,
	MOVE_UP,
	RESET_GAME,
	RESTORE_LAST_MOVE,
	SET_IS_GAME_OVER,
	SET_IS_RESTART_GAME_ALERTING,
	SET_IS_YOU_WIN,
} from './actionTypes';
import { isAllowToMove } from '../../../utils/data';

export function resetGame() {
	return {
		type: RESET_GAME,
	};
}

export function generateNewCells(amount = 1) {
	return {
		type: GENERATE_NEW_CELLS,
		amount,
	};
}

export function restartGame() {
	return dispatch => {
		dispatch(resetGame());
		dispatch(generateNewCells(2));
	};
}

export function moveUp() {
	return {
		type: MOVE_UP,
	};
}

export function moveDown() {
	return {
		type: MOVE_DOWN,
	};
}

export function moveLeft() {
	return {
		type: MOVE_LEFT,
	};
}

export function moveRight() {
	return {
		type: MOVE_RIGHT,
	};
}

export function cleanAfterMove() {
	return {
		type: CLEAN_AFTER_MOVE,
	};
}

export function setIsGameOver(value = true) {
	return {
		type: SET_IS_GAME_OVER,
		value,
	};
}

export function checkIsGameOver() {
	return (dispatch, getState) => {
		const { boardCells, boardSize } = getState().data;
		const canMove =
			isAllowToMove(boardCells, boardSize, 'up') ||
			isAllowToMove(boardCells, boardSize, 'down') ||
			isAllowToMove(boardCells, boardSize, 'left') ||
			isAllowToMove(boardCells, boardSize, 'right');

		if (!canMove) {
			dispatch(setIsGameOver());
		}
	};
}

export function setIsYouWin(value = true) {
	return {
		type: SET_IS_YOU_WIN,
		value,
	};
}

export function setRestartGameAlerting(value = true) {
	return {
		type: SET_IS_RESTART_GAME_ALERTING,
		value,
	};
}

export function undoMove() {
	return {
		type: RESTORE_LAST_MOVE,
	};
}
