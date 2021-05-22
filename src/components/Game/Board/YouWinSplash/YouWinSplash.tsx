import React, { useCallback } from 'react';
import cn from 'clsx';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers';
import { setIsYouWin } from '@/redux/reducers/data';
import { AppThunkDispatch } from '@/redux/configureStore';

interface Props {}

const YouWinSplash = ({}: Props): JSX.Element => {
	const active = useSelector((state: RootState) => state.data.isYouWin);

	const dispatch: AppThunkDispatch = useDispatch();

	const handleClickContinue = useCallback(() => {
		dispatch(setIsYouWin({ value: false }));
	}, [dispatch]);

	// const handleClickRestart = useCallback(() => {
	// 	dispatch(restartGame(true));
	// }, []);

	return (
		<div
			className={cn(styles.youWin, {
				[styles.active]: active,
			})}
		>
			<div className={styles.question}>You win!!!</div>
			<div className={styles.answers}>
				<button className={styles.answer} onClick={handleClickContinue}>
					CONTINUE
				</button>
			</div>
		</div>
	);
};

export default YouWinSplash;
