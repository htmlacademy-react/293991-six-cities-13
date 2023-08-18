import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { store } from './store';
import { Provider } from 'react-redux';
import { checkAuthAction, loadFavoritesAction, loadOffersAction } from './services/api-actions';
import { DEFAULT_CITY_NAME } from './const';
import { getCityDataByCityName } from './utils/utils';
import { ToastContainer } from 'react-toastify';
import { changeCity } from './store/offers-process/offers-process';

store.dispatch(loadOffersAction());
store.dispatch(changeCity(getCityDataByCityName(DEFAULT_CITY_NAME)));
store.dispatch(checkAuthAction());
store.dispatch(loadFavoritesAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
      <ToastContainer/>
    </Provider>
  </React.StrictMode>
);
