import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import styles from './styles.module.scss';
import { isAllowToMove } from '@/utils/data';
import GameOverSplash from './GameOverSplash/GameOverSplash';
import { boardSizePxSelector } from '@/redux/selectors';
import RestartSplash from './RestartSplash/RestartSplash';
import YouWinSplash from './YouWinSplash/YouWinSplash';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers';
import {
	checkIsGameOver,
	cleanAfterMove,
	generateNewCells,
	moveDown,
	moveLeft,
	moveRight,
	moveUp,
} from '@/redux/reducers/data';
import FrontCells from './FrontCells/FrontCells';
import BackCells from './BackCells/BackCells';
import { AppThunkDispatch } from '@/redux/configureStore';
import { Direction } from '@/types';

const Board = (): JSX.Element => {
	const dispatch: AppThunkDispatch = useDispatch();

	const boardSize = useSelector((state: RootState) => state.data.boardSize);
	const boardCells = useSelector((state: RootState) => state.data.boardCells);
	const marginSizePx = useSelector((state: RootState) => state.uiSettings.marginSizePx);
	const boardSizePx = useSelector(boardSizePxSelector);
	const isYouWin = useSelector((state: RootState) => state.data.isYouWin);
	const isGameOver = useSelector((state: RootState) => state.data.isGameOver);

	const busyRef = useRef(false);
	const touchstartXRef = useRef(0);
	const touchstartYRef = useRef(0);
	const touchendXRef = useRef(0);
	const touchendYRef = useRef(0);
	const boardRef = useRef<HTMLDivElement | null>(null);

	const processMove = useCallback(
		(direction) => {
			if (isYouWin || isGameOver || busyRef.current) {
				return;
			}

			let moved = false;
			switch (direction) {
				case Direction.Up:
					moved = isAllowToMove(boardCells, boardSize, Direction.Up);
					if (moved) {
						dispatch(moveUp());
					}
					break;
				case Direction.Down:
					moved = isAllowToMove(boardCells, boardSize, Direction.Down);
					if (moved) {
						dispatch(moveDown());
					}
					break;
				case Direction.Left:
					moved = isAllowToMove(boardCells, boardSize, Direction.Left);
					if (moved) {
						dispatch(moveLeft());
					}
					break;
				case Direction.Right:
					moved = isAllowToMove(boardCells, boardSize, Direction.Right);
					if (moved) {
						dispatch(moveRight());
					}
					break;
				default:
			}

			if (moved) {
				dispatch(generateNewCells({ amount: 1 }));

				busyRef.current = true;
				setTimeout(() => {
					busyRef.current = false;
					dispatch(cleanAfterMove());
					dispatch(checkIsGameOver());
				}, 100);
			}
		},
		[boardCells, dispatch, isGameOver, isYouWin, boardSize],
	);

	const handleKeyPress = useCallback(
		(event) => {
			switch (event.key) {
				case 'ArrowUp':
					processMove(Direction.Up);
					break;
				case 'ArrowDown':
					processMove(Direction.Down);
					break;
				case 'ArrowLeft':
					processMove(Direction.Left);
					break;
				case 'ArrowRight':
					processMove(Direction.Right);
					break;
				default:
			}
		},
		[processMove],
	);

	const handleGesture = useCallback(() => {
		if (!(touchstartXRef.current && touchstartYRef.current)) {
			return;
		}

		const diffX = touchendXRef.current - touchstartXRef.current;
		const diffY = touchendYRef.current - touchstartYRef.current;

		const absDiffX = Math.abs(diffX);
		const absDiffY = Math.abs(diffY);

		if (Math.max(absDiffX, absDiffY) > 25) {
			if (absDiffX > absDiffY) {
				if (diffX > 0) {
					processMove(Direction.Right);
				} else {
					processMove(Direction.Left);
				}
			} else {
				// eslint-disable-next-line no-lonely-if
				if (diffY > 0) {
					processMove(Direction.Down);
				} else {
					processMove(Direction.Up);
				}
			}

			touchstartXRef.current = 0;
			touchstartYRef.current = 0;
		}
	}, [processMove]);

	const handleTouchStart = useCallback((event) => {
		touchstartXRef.current = event.changedTouches[0].screenX;
		touchstartYRef.current = event.changedTouches[0].screenY;
	}, []);

	const handleTouchMove = useCallback(
		(event) => {
			event.preventDefault();
			touchendXRef.current = event.changedTouches[0].screenX;
			touchendYRef.current = event.changedTouches[0].screenY;
			handleGesture();
		},
		[handleGesture],
	);

	const handleMouseStart = useCallback((event) => {
		touchstartXRef.current = event.pageX;
		touchstartYRef.current = event.pageY;
	}, []);

	const handleMouseEnd = useCallback(() => {
		touchstartXRef.current = 0;
		touchstartYRef.current = 0;
	}, []);

	const handleMouseMove = useCallback(
		(event) => {
			event.preventDefault();
			touchendXRef.current = event.pageX;
			touchendYRef.current = event.pageY;
			handleGesture();
		},
		[handleGesture],
	);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyPress);

		const gestureZone = boardRef.current;
		if (gestureZone) {
			gestureZone.addEventListener('touchstart', handleTouchStart, false);
			gestureZone.addEventListener('touchmove', handleTouchMove, false);
		}

		document.addEventListener('mousedown', handleMouseStart, false);
		document.addEventListener('mouseup', handleMouseEnd, false);
		document.addEventListener('mousemove', handleMouseMove, false);

		return () => {
			document.removeEventListener('keydown', handleKeyPress);

			if (gestureZone) {
				gestureZone.removeEventListener('touchstart', handleTouchStart);
				// gestureZone.removeEventListener('touchend', handleTouchEnd);
			}

			document.removeEventListener('mousedown', handleMouseStart);
			document.removeEventListener('mousemove', handleMouseMove);
		};
	}, [handleKeyPress, handleMouseEnd, handleMouseMove, handleMouseStart, handleTouchMove, handleTouchStart]);

	const style = useMemo(
		() => ({
			width: boardSizePx,
			height: boardSizePx,
			borderRadius: marginSizePx,
		}),
		[boardSizePx, marginSizePx],
	);

	return (
		<div className={styles.board} ref={boardRef} style={style}>
			<div className={styles.back}>
				<BackCells />
			</div>
			<div className={styles.front}>
				<FrontCells />
			</div>
			<GameOverSplash />
			<RestartSplash />
			<YouWinSplash />
		</div>
	);
};

export default Board;
