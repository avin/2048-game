/* eslint-disable no-loop-func */
let cellKeyCounter = 1;
export function generateCellKey() {
	cellKeyCounter += 1;
	return cellKeyCounter;
}

function createNewCell({ x, y, value }) {
	return {
		x,
		y,
		value,
		isMerged: true,
		key: generateCellKey(),
	};
}

export function moveCells(boardCells, boardSize, direction) {
	let plusScore = 0;
	const lastMaxValue = boardCells.reduce((p, cell) => Math.max(p, cell.value), 0);
	let youWin = false;
	const processCells = (x, y) => {
		const cell = boardCells.find(i => i.x === x && i.y === y);
		if (cell) {
			let lastFree;
			let canMove;
			switch (direction) {
				case 'up':
					lastFree = cell.y;
					canMove = cell.y > 0;
					break;
				case 'down':
					lastFree = cell.y;
					canMove = cell.y < boardSize - 1;
					break;
				case 'left':
					lastFree = cell.x;
					canMove = cell.x > 0;
					break;
				case 'right':
					lastFree = cell.x;
					canMove = cell.x < boardSize - 1;
					break;
			}

			const checkLastFree = () => {
				if (direction === 'up' || direction === 'left') {
					return lastFree > 0;
				}
				return lastFree < boardSize - 1;
			};

			while (canMove && checkLastFree()) {
				let aCell;
				switch (direction) {
					case 'up':
						aCell = boardCells.find(i => i.x === x && i.y === lastFree - 1);
						break;
					case 'down':
						aCell = boardCells.find(i => i.x === x && i.y === lastFree + 1);
						break;
					case 'left':
						aCell = boardCells.find(i => i.y === y && i.x === lastFree - 1);
						break;
					case 'right':
						aCell = boardCells.find(i => i.y === y && i.x === lastFree + 1);
						break;
				}

				if (!aCell) {
					if (direction === 'up' || direction === 'left') {
						lastFree -= 1;
					} else {
						lastFree += 1;
					}
				} else {
					if (aCell.value === cell.value && !aCell.isMerged && !aCell.toRemove) {
						if (direction === 'up' || direction === 'left') {
							lastFree -= 1;
						} else {
							lastFree += 1;
						}
						aCell.toRemove = true;
						cell.toRemove = true;

						const newValue = cell.value * 2;
						if (direction === 'up' || direction === 'down') {
							boardCells.push(
								createNewCell({
									x,
									y: lastFree,
									value: newValue,
								}),
							);
						} else {
							boardCells.push(
								createNewCell({
									x: lastFree,
									y,
									value: newValue,
								}),
							);
						}
						plusScore += newValue;

						if (newValue === 2048 && lastMaxValue < 2048) {
							youWin = true;
						}
					}
					canMove = false;
				}
			}
			if (direction === 'up' || direction === 'down') {
				cell.y = lastFree;
			} else {
				cell.x = lastFree;
			}

			cell.moved = true;
		}
	};

	switch (direction) {
		case 'up':
			for (let x = 0; x < boardSize; x += 1) {
				for (let y = 0; y < boardSize; y += 1) {
					processCells(x, y);
				}
			}
			break;
		case 'down':
			for (let x = 0; x < boardSize; x += 1) {
				for (let y = boardSize - 1; y >= 0; y -= 1) {
					processCells(x, y);
				}
			}
			break;
		case 'left':
			for (let y = 0; y < boardSize; y += 1) {
				for (let x = 0; x < boardSize; x += 1) {
					processCells(x, y);
				}
			}
			break;
		case 'right':
			for (let y = 0; y < boardSize; y += 1) {
				for (let x = boardSize - 1; x >= 0; x -= 1) {
					processCells(x, y);
				}
			}
			break;
	}

	return [boardCells, youWin, plusScore];
}

export function isAllowToMove(boardCells, boardSize, direction) {
	switch (direction) {
		case 'up':
			for (let x = 0; x < boardSize; x += 1) {
				let prevValue;
				let hasFreeCell;
				for (let y = 0; y < boardSize; y += 1) {
					const cell = boardCells.find(i => i.x === x && i.y === y);
					if (cell) {
						if (hasFreeCell) {
							return true;
						}
						if (cell.value === prevValue) {
							return true;
						}
						prevValue = cell.value;
					} else {
						hasFreeCell = true;
					}
				}
			}
			break;
		case 'down':
			for (let x = 0; x < boardSize; x += 1) {
				let prevValue;
				let hasFreeCell;
				for (let y = boardSize - 1; y >= 0; y -= 1) {
					const cell = boardCells.find(i => i.x === x && i.y === y);
					if (cell) {
						if (hasFreeCell) {
							return true;
						}
						if (cell.value === prevValue) {
							return true;
						}
						prevValue = cell.value;
					} else {
						hasFreeCell = true;
					}
				}
			}
			break;
		case 'left':
			for (let y = 0; y < boardSize; y += 1) {
				let prevValue;
				let hasFreeCell;
				for (let x = 0; x < boardSize; x += 1) {
					const cell = boardCells.find(i => i.x === x && i.y === y);
					if (cell) {
						if (hasFreeCell) {
							return true;
						}
						if (cell.value === prevValue) {
							return true;
						}
						prevValue = cell.value;
					} else {
						hasFreeCell = true;
					}
				}
			}

			break;
		case 'right':
			for (let y = 0; y < boardSize; y += 1) {
				let prevValue;
				let hasFreeCell;
				for (let x = boardSize - 1; x >= 0; x -= 1) {
					const cell = boardCells.find(i => i.x === x && i.y === y);
					if (cell) {
						if (hasFreeCell) {
							return true;
						}
						if (cell.value === prevValue) {
							return true;
						}
						prevValue = cell.value;
					} else {
						hasFreeCell = true;
					}
				}
			}
			break;
	}

	return false;
}
