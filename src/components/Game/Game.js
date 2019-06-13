import { h } from 'preact';
import styles from './styles.module.scss';
import Board from './Board/Board';
import GameControl from './GameControl/GameControl';
import Logo from './Logo/Logo';

const Game = () => (
	<div className={styles.home}>
		<Logo />
		<GameControl />
		<Board />
	</div>
);

export default Game;
