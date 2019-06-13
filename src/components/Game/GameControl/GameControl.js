import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import styles from './styles.module.scss';
import { boardSizePxSelector } from '../../../redux/selectors';
import UndoIcon from '../../icons/UndoIcon/UndoIcon';
import ReloadIcon from '../../icons/ReloadIcon/ReloadIcon';
import { restartGame, setRestartGameAlerting, undoMove } from '../../../redux/modules/data/actions';

class GameControl extends Component {
	handleClickRestart = () => {
		const { restartGame, setRestartGameAlerting, isGameOver, isYouWin } = this.props;
		if (isGameOver || isYouWin) {
			restartGame();
		} else {
			setRestartGameAlerting();
		}
	};

	handleClickUndo = () => {
		const { undoMove, isGameOver, isYouWin } = this.props;
		if (!(isGameOver || isYouWin)) {
			undoMove();
		}
	};

	render({ score, marginSizePx, cellSizePx, boardSizePx }) {
		const buttonStyle = {
			borderRadius: marginSizePx,
			width: cellSizePx * 0.5,
			height: cellSizePx * 0.5,
		};
		return (
			<div
				className={styles.gameControl}
				style={{
					width: boardSizePx,
					marginBottom: marginSizePx * 3,
					fontSize: cellSizePx * 0.25,
				}}
			>
				<div
					className={styles.scorePanel}
					style={{
						borderRadius: marginSizePx,
						height: buttonStyle.height,
					}}
				>
					<div className={styles.scoreTitle}>Score:</div>
					<div className={styles.scoreValue}>{score}</div>
				</div>

				<div className={styles.controlButtons}>
					<div className={styles.controlButton} style={buttonStyle} onClick={this.handleClickUndo}>
						<UndoIcon size={cellSizePx * 0.3} className={styles.buttonIcon} />
					</div>

					<div className={styles.controlButton} style={buttonStyle} onClick={this.handleClickRestart}>
						<ReloadIcon size={cellSizePx * 0.3} className={styles.buttonIcon} />
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	state => ({
		score: state.data.score,
		isGameOver: state.data.isGameOver,
		isYouWin: state.data.isYouWin,
		marginSizePx: state.uiSettings.marginSizePx,
		cellSizePx: state.uiSettings.cellSizePx,
		boardSizePx: boardSizePxSelector(state),
	}),
	{
		setRestartGameAlerting,
		restartGame,
		undoMove,
	},
)(GameControl);
