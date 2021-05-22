import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UiSettingsState = {
	cellSizePx: number;
	marginSizePx: number;
};

const initialState: UiSettingsState = {
	cellSizePx: 80,
	marginSizePx: 5,
};

const slice = createSlice({
	name: 'uiSettings',
	initialState,
	reducers: {
		setUiSettingsValues: (state, action: PayloadAction<Record<string, unknown>>) => {
			return {
				...state,
				...action.payload,
			};
		},
	},
});

export const { setUiSettingsValues } = slice.actions;

export default slice.reducer;
