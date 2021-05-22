export interface BoardCell {
	x: number;
	y: number;
	key?: number;
	isNew?: boolean;
	value: number;
	toRemove?: boolean;
	isMerged?: boolean;
	moved?: boolean;
}

export enum Direction {
	Up = 'up',
	Right = 'right',
	Down = 'down',
	Left = 'left',
}
