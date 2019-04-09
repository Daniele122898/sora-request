import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import LoadingPage from './components/LoadingPage';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { login } from './actions/auth';

const store = configureStore();
/*
store.dispatch(login({
  username: 'Serenity',
  avatar: 'https://cdn.discordapp.com/avatars/192750776005689344/62a44dac07566bb04f155dbf67da9522.png',
  discriminator: '0783',
  id: '192750776005689344'
}));
*/
const jsx = (
    <Provider store={store}>
      <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

renderApp();
