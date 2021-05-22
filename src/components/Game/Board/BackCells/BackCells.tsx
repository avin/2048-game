import React from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers';

const BackCells = (): JSX.Element => {
	const boardSize = useSelector((state: RootState) => state.data.boardSize);
	const cellSizePx = useSelector((state: RootState) => state.uiSettings.cellSizePx);
	const marginSizePx = useSelector((state: RootState) => state.uiSettings.marginSizePx);

	const cellSize = cellSizePx + marginSizePx;

	const result: JSX.Element[] = [];
	for (let y = 0; y < boardSize; y += 1) {
		for (let x = 0; x < boardSize; x += 1) {
			result.push(
				<div
					key={`${y}_${x}`}
					className={styles.backCell}
					style={{
						width: cellSizePx,
						height: cellSizePx,
						left: x * cellSize + marginSizePx,
						top: cellSize * y + marginSizePx,
						borderRadius: marginSizePx,
					}}
				/>,
			);
		}
	}

	return <>{result}</>;
};

export default BackCells;
