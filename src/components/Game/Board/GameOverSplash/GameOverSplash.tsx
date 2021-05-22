import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'clsx';
import styles from './styles.module.scss';
import { RootState } from '@/redux/reducers';

const GameOverSplash = (): JSX.Element => {
	const active = useSelector((state: RootState) => state.data.isGameOver);

	return (
		<div
			className={cn(styles.gameOver, {
				[styles.active]: active,
			})}
		>
			GAME OVER
		</div>
	);
};

export default GameOverSplash;
