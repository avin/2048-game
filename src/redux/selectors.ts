import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './reducers';

export const boardSizePxSelector = createSelector(
	(state: RootState) => state.data.boardSize,
	(state: RootState) => state.uiSettings.cellSizePx,
	(state: RootState) => state.uiSettings.marginSizePx,

	(boardSize, cellSizePx, marginSizePx) => boardSize * (cellSizePx + marginSizePx) + marginSizePx,
);
