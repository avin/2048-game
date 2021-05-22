import React from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers';
import cn from 'clsx';

const colors = {
	2: 'hsl(33, 34%, 89%)',
	4: 'hsl(38, 47%, 85%)',
	8: 'hsl(28, 77%, 70%)',
	16: 'hsl(20, 85%, 68%)',
	32: 'hsl(12, 87%, 66%)',
	64: 'hsl(8, 90%, 61%)',
	128: 'hsl(46, 73%, 68%)',
	256: 'hsl(45, 79%, 66%)',
	512: 'hsl(45, 79%, 63%)',
	1024: 'hsl(44, 74%, 62%)',
	2048: 'hsl(44, 77%, 60%)',
};

const FrontCells = (): JSX.Element => {
	const boardCells = useSelector((state: RootState) => state.data.boardCells);
	const cellSizePx = useSelector((state: RootState) => state.uiSettings.cellSizePx);
	const marginSizePx = useSelector((state: RootState) => state.uiSettings.marginSizePx);

	const result = boardCells.reduce((p: JSX.Element[], cell) => {
		const { x, y, value, key, isNew, isMerged } = cell;
		const cellSize = cellSizePx + marginSizePx;

		p.push(
			<div
				key={key}
				className={styles.frontCell}
				style={{
					width: cellSizePx,
					height: cellSizePx,
					transform: `translateX(${x * cellSize + marginSizePx}px) translateY(${cellSize * y + marginSizePx}px)`,
				}}
			>
				<div
					className={cn(styles.inner, {
						[styles.isNewCell]: isNew,
						[styles.isMergedCell]: isMerged,
					})}
					style={{
						width: cellSizePx,
						height: cellSizePx,
						borderRadius: marginSizePx,
						fontSize: cellSizePx * (value > 1000 ? 0.4 : 0.5),
						backgroundColor: colors[value] || colors[2048],
					}}
				>
					{value}
				</div>
			</div>,
		);

		return p;
	}, []);

	return <>{result}</>;
};

export default FrontCells;
