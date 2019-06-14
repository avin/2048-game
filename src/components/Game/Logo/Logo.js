import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import styles from './styles.module.scss';
import { boardSizePxSelector } from '../../../redux/selectors';

class Logo extends Component {
	render({ boardSizePx, cellSizePx }) {
		return (
			<div
				className={styles.logo}
				style={{
					width: boardSizePx,
					fontSize: cellSizePx * 0.225,
				}}
			>
				<div
					className={styles.inner}
					style={{
						top: -cellSizePx * 0.75,
					}}
				>
					2048 Game
				</div>
			</div>
		);
	}
}

export default connect(
	state => ({
		boardSizePx: boardSizePxSelector(state),
		cellSizePx: state.uiSettings.cellSizePx,
	}),
	{},
)(Logo);
