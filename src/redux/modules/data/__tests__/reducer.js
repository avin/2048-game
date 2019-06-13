import reducer from '../reducer';
import { CLEAN_AFTER_MOVE, RESET_GAME } from '../actionTypes';

test('RESET_GAME', () => {
	const state = {
		boardCells: [
			{
				x: 0,
				y: 1,
				value: 2,
			},
		],
		isGameOver: true,
		score: 99,
		lastMove: {},
	};

	expect(
		reducer(state, {
			type: RESET_GAME,
		}),
	).toMatchObject({
		boardCells: [],
		isGameOver: false,
		isRestartGameAlerting: false,
		score: 0,
		lastMove: null,
	});
});

test('CLEAN_AFTER_MOVE', () => {
	const state = {
		boardCells: [
			{
				x: 0,
				y: 0,
				isMerged: true,
				value: 4,
			},
			{
				x: 0,
				y: 0,
				toRemove: true,
				value: 4,
			},
			{
				x: 0,
				y: 1,
				value: 2,
			},
		],
	};

	expect(
		reducer(state, {
			type: CLEAN_AFTER_MOVE,
		}),
	).toEqual({
		boardCells: [
			{
				x: 0,
				y: 0,
				value: 4,
			},
			{
				x: 0,
				y: 1,
				value: 2,
			},
		],
	});
});
