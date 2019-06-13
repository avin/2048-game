import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import styles from './styles.module.scss';
import { boardSizePxSelector } from '../../../redux/selectors';

class Logo extends Component {
	render({ boardSizePx }) {
		return (
			<div
				className={styles.logo}
				style={{
					width: boardSizePx,
				}}
			>
				<div className={styles.inner}>2048 Game</div>
			</div>
		);
	}
}

export default connect(
	state => ({
		boardSizePx: boardSizePxSelector(state),
	}),
	{},
)(Logo);
