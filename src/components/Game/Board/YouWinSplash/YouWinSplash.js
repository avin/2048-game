import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import cn from 'clsx';
import styles from './styles.module.scss';
import { restartGame, setIsYouWin, setRestartGameAlerting } from '../../../../redux/modules/data/actions';

class YouWinSplash extends Component {
	handleClickContinue = () => {
		const { setIsYouWin } = this.props;
		setIsYouWin(false);
	};

	handleClickRestart = () => {
		const { restartGame } = this.props;
		restartGame(true);
	};

	render({ active }) {
		return (
			<div
				className={cn(styles.youWin, {
					[styles.active]: active,
				})}
			>
				<div className={styles.question}>You win!!!</div>
				<div className={styles.answers}>
					<div className={styles.answer} onClick={this.handleClickContinue}>
						CONTINUE
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	state => ({
		active: state.data.isYouWin,
	}),
	{
		restartGame,
		setRestartGameAlerting,
		setIsYouWin,
	},
)(YouWinSplash);
