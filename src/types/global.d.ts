import { StoreEnhancer } from '@reduxjs/toolkit';

export {};
declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION__?: () => StoreEnhancer;
	}
}
