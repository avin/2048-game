import { h } from 'preact';
import './styles/index.scss';
import { Provider } from 'preact-redux';
import Game from './components/Game/Game';
import configureStore from './redux/store';
import { restartGame } from './redux/modules/data/actions';
import { prepareBrowser } from './utils/browser';

prepareBrowser();
const store = configureStore();
store.dispatch(restartGame());

// eslint-disable-next-line react/display-name
export default () => (
	<div id="outer">
		<Provider store={store}>
			<Game />
		</Provider>
	</div>
);
