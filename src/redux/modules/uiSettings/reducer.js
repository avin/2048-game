import immer from 'immer';
import { SET_UI_SETTINGS_VALUES } from './actionTypes';

const initialState = {
	cellSizePx: 80,
	marginSizePx: 5,
};

export default function reducer(state = initialState, action = {}) {
	return immer(state, state => {
		switch (action.type) {
			case SET_UI_SETTINGS_VALUES: {
				const { values } = action;
				return state.merge(values);
			}

			default:
				return state;
		}
	});
}
