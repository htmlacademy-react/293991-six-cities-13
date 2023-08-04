import {BrowserRouter, Routes, Route} from 'react-router-dom';
import FavoritiesPage from '../../pages/favorities-page/favorities-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import {AppRoute, DEFAULT_CITY} from '../../const';
import RequireAuth from '../require-auth/require-auth';
import { HelmetProvider } from 'react-helmet-async';
import { OfferDetail, OfferShort } from '../../types/offer';
import { Review } from '../../types/offer-review';
import { useEffect } from 'react';
import { loadOffers } from '../../store/action';
import { useAppDispatch } from '../../hooks';

type AppProps = {
  offersDetail: OfferDetail[];
  reviews: Review[];
  offersFavorities: OfferShort[];
}

function App({offersDetail, reviews, offersFavorities}: AppProps): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadOffers());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<MainPage/>}/>
          <Route path={AppRoute.Login} element={<LoginPage/>}/>
          <Route element={<RequireAuth/>}>
            <Route path={AppRoute.Favorites} element={<FavoritiesPage offersFavorities={offersFavorities}/>}/>
          </Route>
          <Route path={AppRoute.Offer} element={<OfferPage offersDetail={offersDetail} reviews={reviews}/>}/>
          <Route path={AppRoute.NotFound} element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
