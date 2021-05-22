import React, { useCallback, useMemo } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers';
import { setIsYouWin } from '@/redux/reducers/data';
import { AppThunkDispatch } from '@/redux/configureStore';
import Splash from '@/components/common/Splash/Splash';

const YouWinSplash = (): JSX.Element => {
	const active = useSelector((state: RootState) => state.data.isYouWin);

	const dispatch: AppThunkDispatch = useDispatch();

	const handleClickContinue = useCallback(() => {
		dispatch(setIsYouWin({ value: false }));
	}, [dispatch]);

	const answers = useMemo(
		() => [
			{
				title: 'CONTINUE',
				onClick: handleClickContinue,
			},
		],
		[handleClickContinue],
	);

	return <Splash className={styles.splash} active={active} question="You win!!!" answers={answers} />;
};

export default YouWinSplash;
