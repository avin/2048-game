import { MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP, SAVE_LAST_MOVE } from '../modules/data/actionTypes';

const moveActions = [MOVE_LEFT, MOVE_RIGHT, MOVE_DOWN, MOVE_UP];
export default store => next => action => {
	if (moveActions.includes(action.type)) {
		store.dispatch({
			type: SAVE_LAST_MOVE,
		});
	}

	return next(action);
};
