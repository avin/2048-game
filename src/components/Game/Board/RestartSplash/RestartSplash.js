import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import cn from 'clsx';
import styles from './styles.module.scss';
import { restartGame, setRestartGameAlerting } from '../../../../redux/modules/data/actions';

class RestartSplash extends Component {
	handleClickYes = () => {
		const { restartGame } = this.props;
		restartGame(true);
	};

	handleClickNo = () => {
		const { setRestartGameAlerting } = this.props;
		setRestartGameAlerting(false);
	};

	render({ active }) {
		return (
			<div
				className={cn(styles.restart, {
					[styles.active]: active,
				})}
			>
				<div className={styles.question}>Restart game?</div>
				<div className={styles.answers}>
					<div className={styles.answer} onClick={this.handleClickYes}>
						YES
					</div>
					<div className={styles.answer} onClick={this.handleClickNo}>
						NO
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	state => ({
		active: state.data.isRestartGameAlerting,
	}),
	{
		restartGame,
		setRestartGameAlerting,
	},
)(RestartSplash);
