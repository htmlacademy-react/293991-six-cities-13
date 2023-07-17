import {BrowserRouter, Routes, Route} from 'react-router-dom';
import FavoritiesPage from '../../pages/favorities-page/favorities-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import {AppRoute} from '../../const';
import RequireAuth from '../require-auth/require-auth';
import { HelmetProvider } from 'react-helmet-async';
import { OfferDetail, OfferShort } from '../../types/offer';

type AppProps = {
  offersDetail: OfferDetail[];
  offersShort: OfferShort[];
}

function App({offersDetail, offersShort}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<MainPage offersShort={offersShort}/>}/>
          <Route path={AppRoute.Login} element={<LoginPage/>}/>
          <Route element={<RequireAuth/>}>
            <Route path={AppRoute.Favorites} element={<FavoritiesPage/>}/>
          </Route>
          <Route path={AppRoute.Offer} element={<OfferPage/>}/>
          <Route path={AppRoute.NotFound} element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
