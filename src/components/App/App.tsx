import React from 'react';
import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Game from '@/components/Game/Game';

export interface RootProps {
	store: Store;
}

const App = ({ store }: RootProps): JSX.Element => (
	<div id="outer">
		<Provider store={store}>
			<Game />
		</Provider>
	</div>
);

export default App;
