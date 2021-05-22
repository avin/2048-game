import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import Board from './Board/Board';
import GameControl from './GameControl/GameControl';
import Logo from './Logo/Logo';
import { restartGame } from '@/redux/reducers/data';
import { useDispatch } from 'react-redux';
import { AppThunkDispatch } from '@/redux/configureStore';

const Game = (): JSX.Element => {
	const dispatch: AppThunkDispatch = useDispatch();

	useEffect(() => {
		dispatch(restartGame());
	}, [dispatch]);

	return (
		<div className={styles.home}>
			<Logo />
			<GameControl />
			<Board />
		</div>
	);
};

export default Game;
