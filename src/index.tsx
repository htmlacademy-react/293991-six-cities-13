import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offersDetail } from './mocks/offers-detail';
import { reviews } from './mocks/offers-reviews';
import { offersFavorities } from './mocks/offers-favorities';
import { store } from './store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offersDetail={offersDetail} reviews={reviews} offersFavorities={offersFavorities}/>
    </Provider>
  </React.StrictMode>
);
