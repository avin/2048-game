import {
	createStore,
	applyMiddleware,
	compose,
	Store,
	ThunkAction,
	Action,
	ThunkDispatch,
	StoreEnhancer,
	Middleware,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-extraneous-dependencies
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import type { RootState } from './reducers';
import handleMoveMiddleware from './middlewares/handleMoveMiddleware';

const configureStore = (initialState = {}): Store => {
	const enhancers: StoreEnhancer[] = [];
	const middleware: Middleware[] = [thunk, handleMoveMiddleware];

	if (process.env.NODE_ENV !== 'production') {
		const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

		if (typeof devToolsExtension === 'function') {
			enhancers.push(devToolsExtension());
		}
	}

	const composedEnhancers: StoreEnhancer = compose(applyMiddleware(...middleware), ...enhancers);

	const store = createStore(rootReducer, initialState, composedEnhancers);

	if (process.env.NODE_ENV !== 'production' && module.hot) {
		module.hot.accept('./reducers', () => {
			store.replaceReducer(rootReducer);
		});
	}

	return store;
};

export default configureStore;

export type AppThunkAction<T> = ThunkAction<T, RootState, unknown, Action<string>>;

export type AppThunkDispatch = ThunkDispatch<RootState, unknown, Action<string>>;
