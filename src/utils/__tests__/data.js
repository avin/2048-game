import { isAllowToMove, moveCells } from '../data';

const boardSize = 4;

describe('moveCells - UP', () => {
	test('move test 1', () => {
		const cells = [
			{
				x: 0,
				y: 0,
				value: 4,
			},
			{
				x: 0,
				y: 3,
				value: 2,
			},
		];

		moveCells(cells, boardSize, 'up');

		expect(cells[0]).toMatchObject({
			x: 0,
			y: 0,
			value: 4,
			moved: true,
		});
		expect(cells[1]).toMatchObject({
			x: 0,
			y: 1,
			value: 2,
			moved: true,
		});
	});

	test('move test 2', () => {
		const cells = [
			{
				x: 0,
				y: 1,
				value: 4,
			},
			{
				x: 0,
				y: 3,
				value: 2,
			},
		];

		moveCells(cells, boardSize, 'up');

		expect(cells[0]).toMatchObject({
			x: 0,
			y: 0,
			value: 4,
			moved: true,
		});
		expect(cells[1]).toMatchObject({
			x: 0,
			y: 1,
			value: 2,
			moved: true,
		});
	});

	test('merge test 1', () => {
		const cells = [
			{
				x: 0,
				y: 0,
				value: 2,
			},
			{
				x: 0,
				y: 3,
				value: 2,
			},
		];

		moveCells(cells, boardSize, 'up');

		expect(cells[0]).toMatchObject({
			x: 0,
			y: 0,
			value: 2,
			toRemove: true,
		});
		expect(cells[1]).toMatchObject({
			x: 0,
			y: 0,
			value: 2,
			toRemove: true,
		});
		expect(cells[2]).toMatchObject({
			x: 0,
			y: 0,
			value: 4,
			isMerged: true,
		});
	});

	test('merge test 2', () => {
		const cells = [
			{
				x: 0,
				y: 0,
				value: 2,
			},
			{
				x: 0,
				y: 1,
				value: 2,
			},
			{
				x: 0,
				y: 2,
				value: 2,
			},
			{
				x: 0,
				y: 3,
				value: 2,
			},
		];

		moveCells(cells, boardSize, 'up');

		expect(cells[0]).toMatchObject({
			x: 0,
			y: 0,
			value: 2,
			toRemove: true,
		});
		expect(cells[1]).toMatchObject({
			x: 0,
			y: 0,
			value: 2,
			toRemove: true,
		});
		expect(cells[2]).toMatchObject({
			x: 0,
			y: 1,
			value: 2,
			toRemove: true,
		});
		expect(cells[3]).toMatchObject({
			x: 0,
			y: 1,
			value: 2,
			toRemove: true,
		});

		expect(cells[4]).toMatchObject({
			x: 0,
			y: 0,
			value: 4,
			isMerged: true,
		});
		expect(cells[5]).toMatchObject({
			x: 0,
			y: 1,
			value: 4,
			isMerged: true,
		});
	});
});

describe('moveCells - DOWN', () => {
	test('move test 1', () => {
		const cells = [
			{
				x: 0,
				y: 0,
				value: 4,
			},
			{
				x: 0,
				y: 3,
				value: 2,
			},
		];

		moveCells(cells, boardSize, 'down');

		expect(cells[0]).toMatchObject({
			x: 0,
			y: 2,
			value: 4,
			moved: true,
		});
		expect(cells[1]).toMatchObject({
			x: 0,
			y: 3,
			value: 2,
			moved: true,
		});
	});

	test('move test 2', () => {
		const cells = [
			{
				x: 0,
				y: 1,
				value: 4,
			},
			{
				x: 0,
				y: 2,
				value: 2,
			},
		];

		moveCells(cells, boardSize, 'down');

		expect(cells[0]).toMatchObject({
			x: 0,
			y: 2,
			value: 4,
			moved: true,
		});
		expect(cells[1]).toMatchObject({
			x: 0,
			y: 3,
			value: 2,
			moved: true,
		});
	});

	test('merge test 1', () => {
		const cells = [
			{
				x: 0,
				y: 0,
				value: 2,
			},
			{
				x: 0,
				y: 3,
				value: 2,
			},
		];

		moveCells(cells, boardSize, 'down');

		expect(cells[0]).toMatchObject({
			x: 0,
			y: 3,
			value: 2,
			toRemove: true,
		});
		expect(cells[1]).toMatchObject({
			x: 0,
			y: 3,
			value: 2,
			toRemove: true,
		});
		expect(cells[2]).toMatchObject({
			x: 0,
			y: 3,
			value: 4,
			isMerged: true,
		});
	});

	test('merge test 2', () => {
		const cells = [
			{
				x: 0,
				y: 0,
				value: 2,
			},
			{
				x: 0,
				y: 1,
				value: 2,
			},
			{
				x: 0,
				y: 2,
				value: 2,
			},
			{
				x: 0,
				y: 3,
				value: 2,
			},
		];

		moveCells(cells, boardSize, 'down');

		expect(cells[0]).toMatchObject({
			x: 0,
			y: 2,
			value: 2,
			toRemove: true,
		});
		expect(cells[1]).toMatchObject({
			x: 0,
			y: 2,
			value: 2,
			toRemove: true,
		});
		expect(cells[2]).toMatchObject({
			x: 0,
			y: 3,
			value: 2,
			toRemove: true,
		});
		expect(cells[3]).toMatchObject({
			x: 0,
			y: 3,
			value: 2,
			toRemove: true,
		});

		expect(cells[4]).toMatchObject({
			x: 0,
			y: 3,
			value: 4,
			isMerged: true,
		});
		expect(cells[5]).toMatchObject({
			x: 0,
			y: 2,
			value: 4,
			isMerged: true,
		});
	});
});

describe('moveCells - LEFT', () => {
	test('move test 1', () => {
		const cells = [
			{
				x: 0,
				y: 0,
				value: 4,
			},
			{
				x: 3,
				y: 0,
				value: 2,
			},
		];

		moveCells(cells, boardSize, 'left');

		expect(cells[0]).toMatchObject({
			x: 0,
			y: 0,
			value: 4,
			moved: true,
		});
		expect(cells[1]).toMatchObject({
			x: 1,
			y: 0,
			value: 2,
			moved: true,
		});
	});

	test('move test 2', () => {
		const cells = [
			{
				x: 1,
				y: 0,
				value: 4,
			},
			{
				x: 3,
				y: 0,
				value: 2,
			},
		];

		moveCells(cells, boardSize, 'left');

		expect(cells[0]).toMatchObject({
			x: 0,
			y: 0,
			value: 4,
			moved: true,
		});
		expect(cells[1]).toMatchObject({
			x: 1,
			y: 0,
			value: 2,
			moved: true,
		});
	});

	test('merge test 1', () => {
		const cells = [
			{
				x: 0,
				y: 0,
				value: 2,
			},
			{
				x: 3,
				y: 0,
				value: 2,
			},
		];

		moveCells(cells, boardSize, 'left');

		expect(cells[0]).toMatchObject({
			x: 0,
			y: 0,
			value: 2,
			toRemove: true,
		});
		expect(cells[1]).toMatchObject({
			x: 0,
			y: 0,
			value: 2,
			toRemove: true,
		});
		expect(cells[2]).toMatchObject({
			x: 0,
			y: 0,
			value: 4,
			isMerged: true,
		});
	});

	test('merge test 2', () => {
		const cells = [
			{
				x: 0,
				y: 0,
				value: 2,
			},
			{
				x: 1,
				y: 0,
				value: 2,
			},
			{
				x: 2,
				y: 0,
				value: 2,
			},
			{
				x: 3,
				y: 0,
				value: 2,
			},
		];

		moveCells(cells, boardSize, 'left');

		expect(cells[0]).toMatchObject({
			x: 0,
			y: 0,
			value: 2,
			toRemove: true,
		});
		expect(cells[1]).toMatchObject({
			x: 0,
			y: 0,
			value: 2,
			toRemove: true,
		});
		expect(cells[2]).toMatchObject({
			x: 1,
			y: 0,
			value: 2,
			toRemove: true,
		});
		expect(cells[3]).toMatchObject({
			x: 1,
			y: 0,
			value: 2,
			toRemove: true,
		});

		expect(cells[4]).toMatchObject({
			x: 0,
			y: 0,
			value: 4,
			isMerged: true,
		});
		expect(cells[5]).toMatchObject({
			x: 1,
			y: 0,
			value: 4,
			isMerged: true,
		});
	});
});

describe('moveCells - RIGHT', () => {
	test('move test 1', () => {
		const cells = [
			{
				x: 0,
				y: 0,
				value: 4,
			},
			{
				x: 3,
				y: 0,
				value: 2,
			},
		];

		moveCells(cells, boardSize, 'right');

		expect(cells[0]).toMatchObject({
			x: 2,
			y: 0,
			value: 4,
			moved: true,
		});
		expect(cells[1]).toMatchObject({
			x: 3,
			y: 0,
			value: 2,
			moved: true,
		});
	});

	test('move test 2', () => {
		const cells = [
			{
				x: 1,
				y: 0,
				value: 4,
			},
			{
				x: 2,
				y: 0,
				value: 2,
			},
		];

		moveCells(cells, boardSize, 'right');

		expect(cells[0]).toMatchObject({
			x: 2,
			y: 0,
			value: 4,
			moved: true,
		});
		expect(cells[1]).toMatchObject({
			x: 3,
			y: 0,
			value: 2,
			moved: true,
		});
	});

	test('merge test 1', () => {
		const cells = [
			{
				x: 0,
				y: 0,
				value: 2,
			},
			{
				x: 3,
				y: 0,
				value: 2,
			},
		];

		moveCells(cells, boardSize, 'right');

		expect(cells[0]).toMatchObject({
			x: 3,
			y: 0,
			value: 2,
			toRemove: true,
		});
		expect(cells[1]).toMatchObject({
			x: 3,
			y: 0,
			value: 2,
			toRemove: true,
		});
		expect(cells[2]).toMatchObject({
			x: 3,
			y: 0,
			value: 4,
			isMerged: true,
		});
	});

	test('merge test 2', () => {
		const cells = [
			{
				x: 0,
				y: 0,
				value: 2,
			},
			{
				x: 1,
				y: 0,
				value: 2,
			},
			{
				x: 2,
				y: 0,
				value: 2,
			},
			{
				x: 3,
				y: 0,
				value: 2,
			},
		];

		moveCells(cells, boardSize, 'right');

		expect(cells[0]).toMatchObject({
			x: 2,
			y: 0,
			value: 2,
			toRemove: true,
		});
		expect(cells[1]).toMatchObject({
			x: 2,
			y: 0,
			value: 2,
			toRemove: true,
		});
		expect(cells[2]).toMatchObject({
			x: 3,
			y: 0,
			value: 2,
			toRemove: true,
		});
		expect(cells[3]).toMatchObject({
			x: 3,
			y: 0,
			value: 2,
			toRemove: true,
		});

		expect(cells[4]).toMatchObject({
			x: 3,
			y: 0,
			value: 4,
			isMerged: true,
		});
		expect(cells[5]).toMatchObject({
			x: 2,
			y: 0,
			value: 4,
			isMerged: true,
		});
	});
});

describe('moveCells - blank', () => {
	test('move test 1', () => {
		const cells = [
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
		];

		moveCells(cells, boardSize, 'up');
	});
});

describe('isAllowToMove - UP', () => {
	test('no free cells', () => {
		const cells = [
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
		];

		expect(isAllowToMove(cells, boardSize, 'up')).toBe(false);
	});

	test('has free cells', () => {
		const cells = [
			{
				x: 0,
				y: 0,
				value: 4,
			},
			{
				x: 0,
				y: 2,
				value: 2,
			},
		];

		expect(isAllowToMove(cells, boardSize, 'up')).toBe(true);
	});

	test('allow to merge', () => {
		const cells = [
			{
				x: 0,
				y: 0,
				value: 2,
			},
			{
				x: 0,
				y: 1,
				value: 2,
			},
		];

		expect(isAllowToMove(cells, boardSize, 'up')).toBe(true);
	});
});

describe('isAllowToMove - DOWN', () => {
	test('no free cells', () => {
		const cells = [
			{
				x: 0,
				y: 2,
				value: 4,
			},
			{
				x: 0,
				y: 3,
				value: 2,
			},
		];

		expect(isAllowToMove(cells, boardSize, 'down')).toBe(false);
	});

	test('has free cells', () => {
		const cells = [
			{
				x: 0,
				y: 1,
				value: 4,
			},
			{
				x: 0,
				y: 3,
				value: 2,
			},
		];

		expect(isAllowToMove(cells, boardSize, 'down')).toBe(true);
	});

	test('allow to merge', () => {
		const cells = [
			{
				x: 0,
				y: 2,
				value: 2,
			},
			{
				x: 0,
				y: 3,
				value: 2,
			},
		];

		expect(isAllowToMove(cells, boardSize, 'down')).toBe(true);
	});
});

describe('isAllowToMove - LEFT', () => {
	test('no free cells', () => {
		const cells = [
			{
				x: 0,
				y: 0,
				value: 4,
			},
			{
				x: 1,
				y: 0,
				value: 2,
			},
		];

		expect(isAllowToMove(cells, boardSize, 'left')).toBe(false);
	});

	test('has free cells', () => {
		const cells = [
			{
				x: 0,
				y: 0,
				value: 4,
			},
			{
				x: 2,
				y: 0,
				value: 2,
			},
		];

		expect(isAllowToMove(cells, boardSize, 'left')).toBe(true);
	});

	test('allow to merge', () => {
		const cells = [
			{
				x: 0,
				y: 0,
				value: 2,
			},
			{
				x: 1,
				y: 0,
				value: 2,
			},
		];

		expect(isAllowToMove(cells, boardSize, 'left')).toBe(true);
	});
});

describe('isAllowToMove - RIGHT', () => {
	test('no free cells', () => {
		const cells = [
			{
				x: 2,
				y: 0,
				value: 4,
			},
			{
				x: 3,
				y: 0,
				value: 2,
			},
		];

		expect(isAllowToMove(cells, boardSize, 'right')).toBe(false);
	});

	test('has free cells', () => {
		const cells = [
			{
				x: 1,
				y: 0,
				value: 4,
			},
			{
				x: 3,
				y: 0,
				value: 2,
			},
		];

		expect(isAllowToMove(cells, boardSize, 'right')).toBe(true);
	});

	test('allow to merge', () => {
		const cells = [
			{
				x: 2,
				y: 0,
				value: 2,
			},
			{
				x: 3,
				y: 0,
				value: 2,
			},
		];

		expect(isAllowToMove(cells, boardSize, 'right')).toBe(true);
	});
});
