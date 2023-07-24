import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offersDetail } from './mocks/offers-detail';
import { offersShort } from './mocks/offers-short';
import { reviews } from './mocks/offers-reviews';
import { offersFavorities } from './mocks/offers-favorities';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offersDetail={offersDetail} offersShort={offersShort} reviews={reviews} offersFavorities={offersFavorities}/>
  </React.StrictMode>
);
