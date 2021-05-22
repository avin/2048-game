/* eslint-disable no-loop-func */
import { BoardCell, Direction } from '@/types';

let cellKeyCounter = 1;

export function generateCellKey(): number {
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

export function moveCells(
	boardCells: BoardCell[],
	boardSize: number,
	direction: Direction,
): [BoardCell[], boolean, number] {
	let plusScore = 0;
	const lastMaxValue = boardCells.reduce((p, cell) => Math.max(p, cell.value), 0);
	let youWin = false;
	const processCells = (x, y) => {
		const cell = boardCells.find((i) => i.x === x && i.y === y);
		if (cell) {
			let lastFree = -1;
			let canMove;
			switch (direction) {
				case Direction.Up:
					lastFree = cell.y;
					canMove = cell.y > 0;
					break;
				case Direction.Down:
					lastFree = cell.y;
					canMove = cell.y < boardSize - 1;
					break;
				case Direction.Left:
					lastFree = cell.x;
					canMove = cell.x > 0;
					break;
				case Direction.Right:
					lastFree = cell.x;
					canMove = cell.x < boardSize - 1;
					break;
				default:
			}

			const checkLastFree = () => {
				if (direction === Direction.Up || direction === Direction.Left) {
					return lastFree > 0;
				}
				return lastFree < boardSize - 1;
			};

			while (canMove && checkLastFree()) {
				let aCell;
				switch (direction) {
					case Direction.Up:
						aCell = boardCells.find((i) => i.x === x && i.y === lastFree - 1);
						break;
					case Direction.Down:
						aCell = boardCells.find((i) => i.x === x && i.y === lastFree + 1);
						break;
					case Direction.Left:
						aCell = boardCells.find((i) => i.y === y && i.x === lastFree - 1);
						break;
					case Direction.Right:
						aCell = boardCells.find((i) => i.y === y && i.x === lastFree + 1);
						break;
					default:
				}

				if (!aCell) {
					if (direction === Direction.Up || direction === Direction.Left) {
						lastFree -= 1;
					} else {
						lastFree += 1;
					}
				} else {
					if (aCell.value === cell.value && !aCell.isMerged && !aCell.toRemove) {
						if (direction === Direction.Up || direction === Direction.Left) {
							lastFree -= 1;
						} else {
							lastFree += 1;
						}
						aCell.toRemove = true;
						cell.toRemove = true;

						const newValue = cell.value * 2;
						if (direction === Direction.Up || direction === Direction.Down) {
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
			if (direction === Direction.Up || direction === Direction.Down) {
				cell.y = lastFree;
			} else {
				cell.x = lastFree;
			}

			cell.moved = true;
		}
	};

	switch (direction) {
		case Direction.Up:
			for (let x = 0; x < boardSize; x += 1) {
				for (let y = 0; y < boardSize; y += 1) {
					processCells(x, y);
				}
			}
			break;
		case Direction.Down:
			for (let x = 0; x < boardSize; x += 1) {
				for (let y = boardSize - 1; y >= 0; y -= 1) {
					processCells(x, y);
				}
			}
			break;
		case Direction.Left:
			for (let y = 0; y < boardSize; y += 1) {
				for (let x = 0; x < boardSize; x += 1) {
					processCells(x, y);
				}
			}
			break;
		case Direction.Right:
			for (let y = 0; y < boardSize; y += 1) {
				for (let x = boardSize - 1; x >= 0; x -= 1) {
					processCells(x, y);
				}
			}
			break;
		default:
	}

	return [boardCells, youWin, plusScore];
}

export function isAllowToMove(boardCells: BoardCell[], boardSize: number, direction: Direction): boolean {
	switch (direction) {
		case Direction.Up:
			for (let x = 0; x < boardSize; x += 1) {
				let prevValue;
				let hasFreeCell;
				for (let y = 0; y < boardSize; y += 1) {
					const cell = boardCells.find((i) => i.x === x && i.y === y);
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
		case Direction.Down:
			for (let x = 0; x < boardSize; x += 1) {
				let prevValue;
				let hasFreeCell;
				for (let y = boardSize - 1; y >= 0; y -= 1) {
					const cell = boardCells.find((i) => i.x === x && i.y === y);
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
		case Direction.Left:
			for (let y = 0; y < boardSize; y += 1) {
				let prevValue;
				let hasFreeCell;
				for (let x = 0; x < boardSize; x += 1) {
					const cell = boardCells.find((i) => i.x === x && i.y === y);
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
		case Direction.Right:
			for (let y = 0; y < boardSize; y += 1) {
				let prevValue;
				let hasFreeCell;
				for (let x = boardSize - 1; x >= 0; x -= 1) {
					const cell = boardCells.find((i) => i.x === x && i.y === y);
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
		default:
	}

	return false;
}
