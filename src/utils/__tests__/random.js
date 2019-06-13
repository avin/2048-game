import { randomRange, randomArrayElement } from '../random';

describe('randomRange', () => {
	test('return value', () => {
		const from = 1;
		const to = 2;
		const value = randomRange(from, to);

		expect(value >= from && value < to).toBeTruthy();
	});
	test('throw error wrong range', () => {
		const from = 2;
		const to = 1;

		expect(() => randomRange(from, to)).toThrowError();
	});
});

describe('randomArrayElement', () => {
	test('return random element', () => {
		const arr = [11, 22, 33];
		const el = randomArrayElement(arr);

		expect(arr.includes(el)).toBeTruthy();
	});

	test('return undefined from empty array', () => {
		const arr = [];
		const el = randomArrayElement(arr);

		expect(el).toBeUndefined();
	});
});
