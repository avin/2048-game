import React, { useCallback } from 'react';
import cn from 'clsx';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers';
import { restartGame, setIsRestartGameAlerting } from '@/redux/reducers/data';
import { AppThunkDispatch } from '@/redux/configureStore';

const RestartSplash = (): JSX.Element => {
	const active = useSelector((state: RootState) => state.data.isRestartGameAlerting);

	const dispatch: AppThunkDispatch = useDispatch();

	const handleClickYes = useCallback(() => {
		dispatch(restartGame());
	}, [dispatch]);

	const handleClickNo = useCallback(() => {
		dispatch(setIsRestartGameAlerting({ value: false }));
	}, [dispatch]);

	return (
		<div
			className={cn(styles.restart, {
				[styles.active]: active,
			})}
		>
			<div className={styles.question}>Restart game?</div>
			<div className={styles.answers}>
				<button type="button" className={styles.answer} onClick={handleClickYes}>
					YES
				</button>
				<button type="button" className={styles.answer} onClick={handleClickNo}>
					NO
				</button>
			</div>
		</div>
	);
};

export default RestartSplash;
