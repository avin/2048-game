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

	touchstartX = 0;

	touchstartY = 0;

	touchendX = 0;

	touchendY = 0;

	processMove(direction) {
		const {
			isYouWin,
			isGameOver,
			moveUp,
			moveDown,
			moveLeft,
			moveRight,
			cleanAfterMove,
			generateNewCells,
			boardCells,
			boardSize,
			checkIsGameOver,
		} = this.props;

		if (isYouWin || isGameOver || this.busy) {
			return;
		}

		let moved = false;
		switch (direction) {
			case 'up':
				moved = isAllowToMove(boardCells, boardSize, 'up');
				if (moved) {
					moveUp();
				}
				break;
			case 'down':
				moved = isAllowToMove(boardCells, boardSize, 'down');
				if (moved) {
					moveDown();
				}
				break;
			case 'left':
				moved = isAllowToMove(boardCells, boardSize, 'left');
				if (moved) {
					moveLeft();
				}
				break;
			case 'right':
				moved = isAllowToMove(boardCells, boardSize, 'right');
				if (moved) {
					moveRight();
				}
				break;
		}

		if (moved) {
			generateNewCells();

			this.busy = true;
			setTimeout(() => {
				this.busy = false;
				cleanAfterMove();
				checkIsGameOver();
			}, 100);
		}
	}

	handleKeyPress = event => {
		switch (event.key) {
			case 'ArrowUp':
				this.processMove('up');
				break;
			case 'ArrowDown':
				this.processMove('down');
				break;
			case 'ArrowLeft':
				this.processMove('left');
				break;
			case 'ArrowRight':
				this.processMove('right');
				break;
		}
	};

	handleGesture() {
		if (!(this.touchstartX && this.touchstartY)) {
			return;
		}

		const diffX = this.touchendX - this.touchstartX;
		const diffY = this.touchendY - this.touchstartY;

		const absDiffX = Math.abs(diffX);
		const absDiffY = Math.abs(diffY);

		if (Math.max(absDiffX, absDiffY) > 25) {
			if (absDiffX > absDiffY) {
				if (diffX > 0) {
					this.processMove('right');
				} else {
					this.processMove('left');
				}
			} else {
				// eslint-disable-next-line no-lonely-if
				if (diffY > 0) {
					this.processMove('down');
				} else {
					this.processMove('up');
				}
			}

			this.touchstartX = 0;
			this.touchstartY = 0;
		}
	}

	handleTouhchStart = event => {
		this.touchstartX = event.changedTouches[0].screenX;
		this.touchstartY = event.changedTouches[0].screenY;
	};

	handleTouhchMove = event => {
		this.touchendX = event.changedTouches[0].screenX;
		this.touchendY = event.changedTouches[0].screenY;
		this.handleGesture();
	};

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyPress);

		const gestureZone = this.boardRef;
		gestureZone.addEventListener('touchstart', this.handleTouhchStart, false);
		gestureZone.addEventListener('touchmove', this.handleTouhchMove, false);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress);

		const gestureZone = this.boardRef;
		gestureZone.removeEventListener('touchstart', this.handleTouhchStart);
		gestureZone.removeEventListener('touchend', this.handleTouhchEnd);
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
						transform: `translateX(${x * cellSize + marginSizePx}px) translateY(${cellSize * y +
							marginSizePx}px)`,
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
				ref={i => {
					this.boardRef = i;
				}}
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
