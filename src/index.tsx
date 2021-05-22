import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/components/App/App';
import './styles/index.scss';
import configureStore from './redux/configureStore';

// prepareBrowser();
const store = configureStore();

// eslint-disable-next-line react/display-name
ReactDOM.render(<App store={store} />, document.getElementById('root'));
