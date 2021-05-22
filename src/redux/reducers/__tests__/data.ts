import configureStore from '../../configureStore';
import { cleanAfterMove, resetGame } from '@/redux/reducers/data';

test('RESET_GAME', () => {
	const store = configureStore({
		data: {
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
		},
	});

	store.dispatch(resetGame());

	expect(store.getState().data).toMatchObject({
		boardCells: [],
		isGameOver: false,
		isRestartGameAlerting: false,
		score: 0,
		lastMove: null,
	});
});

test('CLEAN_AFTER_MOVE', () => {
	const store = configureStore({
		data: {
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
		},
	});

	store.dispatch(cleanAfterMove());

	expect(store.getState().data).toEqual({
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
