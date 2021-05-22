import { combineReducers } from '@reduxjs/toolkit';
import data from './data';
import uiSettings from './uiSettings';

const rootReducer = combineReducers({
	data,
	uiSettings,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
