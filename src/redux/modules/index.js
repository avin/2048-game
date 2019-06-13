import { combineReducers } from 'redux';
import uiSettings from './uiSettings';
import data from './data';

export default combineReducers({
	uiSettings,
	data,
});
