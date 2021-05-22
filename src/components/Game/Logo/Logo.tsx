import React from 'react';
import styles from './styles.module.scss';
import { boardSizePxSelector } from '@/redux/selectors';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers';

const Logo = (): JSX.Element => {
	const boardSizePx = useSelector(boardSizePxSelector);
	const cellSizePx = useSelector((state: RootState) => state.uiSettings.cellSizePx);

	return (
		<div
			className={styles.logo}
			style={{
				width: boardSizePx,
				fontSize: cellSizePx * 0.225,
			}}
		>
			<div
				className={styles.inner}
				style={{
					top: -cellSizePx * 0.75,
				}}
			>
				2048 Game
			</div>
		</div>
	);
};

export default Logo;
