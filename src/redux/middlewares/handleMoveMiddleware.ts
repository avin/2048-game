import { MiddlewareAPI, Action, Dispatch } from 'redux';
import { saveLastMove, moveLeft, moveRight, moveDown, moveUp } from '@/redux/reducers/data';

const moveActions = [moveLeft.type, moveRight.type, moveDown.type, moveUp.type];

export default (store: MiddlewareAPI) => (next: Dispatch) => (action: Action): Action => {
	if (moveActions.includes(action.type)) {
		store.dispatch(saveLastMove());
	}

	return next(action);
};
