import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import cn from 'clsx';
import styles from './styles.module.scss';
import {
	cleanAfterMove,
	generateNewCells,
	moveDown,
	moveLeft,
	moveRight,
	moveUp,
	checkIsGameOver,
} from '../../../redux/modules/data/actions';
import { isAllowToMove } from '../../../utils/data';
import GameOverSplash from './GameOverSplash/GameOverSplash';
import { boardSizePxSelector } from '../../../redux/selectors';
import RestartSplash from './RestartSplash/RestartSplash';
import YouWinSplash from './YouWinSplash/YouWinSplash';

const colors = {
	2: 'hsl(33, 34%, 89%)',
	4: 'hsl(38, 47%, 85%)',
	8: 'hsl(28, 77%, 70%)',
	16: 'hsl(20, 85%, 68%)',
	32: 'hsl(12, 87%, 66%)',
	64: 'hsl(8, 90%, 61%)',
	128: 'hsl(46, 73%, 68%)',
	256: 'hsl(45, 79%, 66%)',
	512: 'hsl(45, 79%, 63%)',
	1024: 'hsl(44, 74%, 62%)',
	2048: 'hsl(44, 77%, 60%)',
};

class Board extends Component {
	busy = false;

	handleKeyPress = event => {
		const {
			moveUp,
			moveDown,
			moveLeft,
			moveRight,
			cleanAfterMove,
			generateNewCells,
			boardCells,
			boardSize,
			checkIsGameOver,
			isYouWin,
			isGameOver,
		} = this.props;

		if (isYouWin || isGameOver || this.busy) {
			return;
		}

		let moved = false;
		switch (event.key) {
			case 'ArrowUp':
				moved = isAllowToMove(boardCells, boardSize, 'up');
				if (moved) {
					moveUp();
				}
				break;
			case 'ArrowDown':
				moved = isAllowToMove(boardCells, boardSize, 'down');
				if (moved) {
					moveDown();
				}
				break;
			case 'ArrowLeft':
				moved = isAllowToMove(boardCells, boardSize, 'left');
				if (moved) {
					moveLeft();
				}
				break;
			case 'ArrowRight':
				moved = isAllowToMove(boardCells, boardSize, 'right');
				if (moved) {
					moveRight();
				}
				break;
		}

		if (moved) {
			generateNewCells();

			if (['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'].includes(event.key)) {
				this.busy = true;
				setTimeout(() => {
					this.busy = false;
					cleanAfterMove();
					checkIsGameOver();
				}, 100);
			}
		}
	};

	marginSizePx;

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyPress);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress);
	}

	renderBackCells() {
		const { boardSize, cellSizePx, marginSizePx } = this.props;

		const cellSize = cellSizePx + marginSizePx;

		const result = [];
		for (let y = 0; y < boardSize; y += 1) {
			for (let x = 0; x < boardSize; x += 1) {
				result.push(
					<div
						key={`${y}_${x}`}
						className={styles.backCell}
						style={{
							width: cellSizePx,
							height: cellSizePx,
							left: x * cellSize + marginSizePx,
							top: cellSize * y + marginSizePx,
							borderRadius: marginSizePx,
						}}
					/>,
				);
			}
		}

		return result;
	}

	renderFrontCells() {
		const { boardCells } = this.props;
		const { cellSizePx, marginSizePx } = this.props;

		return boardCells.reduce((p, cell) => {
			const { x, y, value, key, isNew, isMerged } = cell;
			const cellSize = cellSizePx + marginSizePx;

			p.push(
				<div
					key={key}
					className={styles.frontCell}
					style={{
						width: cellSizePx,
						height: cellSizePx,
						left: x * cellSize + marginSizePx,
						top: cellSize * y + marginSizePx,
					}}
				>
					<div
						className={cn(styles.inner, {
							[styles.isNewCell]: isNew,
							[styles.isMergedCell]: isMerged,
						})}
						style={{
							width: cellSizePx,
							height: cellSizePx,
							borderRadius: marginSizePx,
							fontSize: cellSizePx * (value > 1000 ? 0.4 : 0.5),
							backgroundColor: colors[value] || colors[2048],
						}}
					>
						{value}
					</div>
				</div>,
			);

			return p;
		}, []);
	}

	render({ marginSizePx, boardSizePx }) {
		return (
			<div
				className={styles.board}
				style={{
					width: boardSizePx,
					height: boardSizePx,
					borderRadius: marginSizePx,
				}}
			>
				<div className={styles.back}>{this.renderBackCells()}</div>
				<div className={styles.front}>{this.renderFrontCells()}</div>
				<GameOverSplash />
				<RestartSplash />
				<YouWinSplash />
			</div>
		);
	}
}

export default connect(
	state => ({
		boardSize: state.data.boardSize,
		boardCells: state.data.boardCells,
		cellSizePx: state.uiSettings.cellSizePx,
		marginSizePx: state.uiSettings.marginSizePx,
		boardSizePx: boardSizePxSelector(state),
		isYouWin: state.data.isYouWin,
		isGameOver: state.data.isGameOver,
	}),
	{
		moveUp,
		moveDown,
		moveLeft,
		moveRight,
		cleanAfterMove,
		generateNewCells,
		checkIsGameOver,
	},
)(Board);
