import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import cn from 'clsx';
import styles from './styles.module.scss';

class GameOverSplash extends Component {
	render({ active }) {
		return (
			<div
				className={cn(styles.gameOver, {
					[styles.active]: active,
				})}
			>
				GAME OVER
			</div>
		);
	}
}

export default connect(
	state => ({
		active: state.data.isGameOver,
	}),
	{},
)(GameOverSplash);
