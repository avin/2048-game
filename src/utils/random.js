/**
 * Random value from range
 *
 * @param {number} from
 * @param {number} to
 * @returns {*}
 */
export function randomRange(from, to) {
	if (to <= from) {
		throw new Error('randomRange: wrong range');
	}
	const size = to - from;
	return ~~(Math.random() * size) + from;
}

/**
 * Random array element
 *
 * @param {array} array
 * @returns {*}
 */
export function randomArrayElement(array) {
	if (!array.length) {
		return undefined;
	}
	return array[randomRange(0, array.length)];
}
