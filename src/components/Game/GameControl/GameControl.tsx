import React, { useCallback, useMemo } from 'react';
import styles from './styles.module.scss';
import { boardSizePxSelector } from '@/redux/selectors';
import UndoIcon from '../../common/UndoIcon/UndoIcon';
import ReloadIcon from '../../common/ReloadIcon/ReloadIcon';
import { RootState } from '@/redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { restartGame, restoreLastMove, setIsRestartGameAlerting } from '@/redux/reducers/data';
import { AppThunkDispatch } from '@/redux/configureStore';

const GameControl = (): JSX.Element => {
	const score = useSelector((state: RootState) => state.data.score);
	const isGameOver = useSelector((state: RootState) => state.data.isGameOver);
	const isYouWin = useSelector((state: RootState) => state.data.isYouWin);
	const marginSizePx = useSelector((state: RootState) => state.uiSettings.marginSizePx);
	const cellSizePx = useSelector((state: RootState) => state.uiSettings.cellSizePx);
	const boardSizePx = useSelector(boardSizePxSelector);

	const dispatch: AppThunkDispatch = useDispatch();

	const handleClickRestart = useCallback(() => {
		if (isGameOver || isYouWin) {
			dispatch(restartGame());
		} else {
			dispatch(setIsRestartGameAlerting({ value: true }));
		}
	}, [dispatch, isGameOver, isYouWin]);

	const handleClickUndo = useCallback(() => {
		if (!(isGameOver || isYouWin)) {
			dispatch(restoreLastMove());
		}
	}, [dispatch, isGameOver, isYouWin]);

	const buttonStyle = useMemo(
		() => ({
			borderRadius: marginSizePx,
			width: cellSizePx * 0.5,
			height: cellSizePx * 0.5,
		}),
		[marginSizePx, cellSizePx],
	);

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
				<button type="button" className={styles.controlButton} style={buttonStyle} onClick={handleClickUndo}>
					<UndoIcon size={cellSizePx * 0.3} className={styles.buttonIcon} />
				</button>

				<button type="button" className={styles.controlButton} style={buttonStyle} onClick={handleClickRestart}>
					<ReloadIcon size={cellSizePx * 0.3} className={styles.buttonIcon} />
				</button>
			</div>
		</div>
	);
};

export default GameControl;
