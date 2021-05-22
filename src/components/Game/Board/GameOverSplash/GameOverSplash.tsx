import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers';
import Splash from '@/components/common/Splash/Splash';
import { restartGame } from '@/redux/reducers/data';
import { AppThunkDispatch } from '@/redux/configureStore';

const GameOverSplash = (): JSX.Element => {
	const active = useSelector((state: RootState) => state.data.isGameOver);
	const dispatch: AppThunkDispatch = useDispatch();

	const handleClickRestart = useCallback(() => {
		dispatch(restartGame());
	}, [dispatch]);

	const answers = useMemo(
		() => [
			{
				title: 'RESTART',
				onClick: handleClickRestart,
			},
		],
		[handleClickRestart],
	);

	return <Splash question="GAME OVER" active={active} answers={answers} />;
};

export default GameOverSplash;
