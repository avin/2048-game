import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers';
import { restartGame, setIsRestartGameAlerting } from '@/redux/reducers/data';
import { AppThunkDispatch } from '@/redux/configureStore';
import styles from './styles.module.scss';
import Splash from '@/components/common/Splash/Splash';

const RestartSplash = (): JSX.Element => {
	const active = useSelector((state: RootState) => state.data.isRestartGameAlerting);

	const dispatch: AppThunkDispatch = useDispatch();

	const handleClickYes = useCallback(() => {
		dispatch(restartGame());
	}, [dispatch]);

	const handleClickNo = useCallback(() => {
		dispatch(setIsRestartGameAlerting({ value: false }));
	}, [dispatch]);

	const answers = useMemo(
		() => [
			{
				title: 'YES',
				onClick: handleClickYes,
			},
			{
				title: 'NO',
				onClick: handleClickNo,
			},
		],
		[handleClickYes, handleClickNo],
	);

	return <Splash question="Restart game?" className={styles.splash} active={active} answers={answers} />;
};

export default RestartSplash;
