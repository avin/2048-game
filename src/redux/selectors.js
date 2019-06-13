import { createSelector } from 'reselect';

export const boardSizePxSelector = createSelector(
	state => state.data.boardSize,
	state => state.uiSettings.cellSizePx,
	state => state.uiSettings.marginSizePx,

	(boardSize, cellSizePx, marginSizePx) => boardSize * (cellSizePx + marginSizePx) + marginSizePx,
);
