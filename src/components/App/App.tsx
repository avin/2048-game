import React from 'react';
import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Game from '@/components/Game/Game';
import styles from './styles.module.scss';
import GitHubLink from '../common/GitHubLink/GitHubLink';

export interface RootProps {
	store: Store;
}

const App = ({ store }: RootProps): JSX.Element => (
	<Provider store={store}>
		<div id="outer" className={styles.app}>
			<div className={styles.headSpace} />

			<Game />

			<div className={styles.footer}>
				<GitHubLink />
			</div>
		</div>
	</Provider>
);

export default App;
