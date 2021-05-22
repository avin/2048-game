/**
 * Random value from range
 *
 * @param {number} from
 * @param {number} to
 * @returns {*}
 */
export function randomRange(from: number, to: number): number {
	if (to <= from) {
		throw new Error('randomRange: wrong range');
	}
	const size = to - from;
	return Math.floor(Math.random() * size) + from;
}

/**
 * Random array element
 *
 * @param {array} array
 * @returns {*}
 */
export function randomArrayElement<T = unknown>(array: T[]): T | undefined {
	if (!array.length) {
		return undefined;
	}
	return array[randomRange(0, array.length)];
}
