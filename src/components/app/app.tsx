import {Routes, Route} from 'react-router-dom';
import FavoritiesPage from '../../pages/favorities-page/favorities-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import {AppRoute} from '../../const';
import RequireAuth from '../require-auth/require-auth';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { checkAuthAction, fetchOffersAction } from '../../services/api-actions';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { deleteOffers } from '../../store/offers-process/offers-process';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
    dispatch(fetchOffersAction());

    return () => {
      dispatch(deleteOffers());
    };
  }, [dispatch]);

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Root} element={<MainPage/>}/>
          <Route path={AppRoute.Login} element={<LoginPage/>}/>
          <Route element={<RequireAuth/>}>
            <Route path={AppRoute.Favorites} element={<FavoritiesPage/>}/>
          </Route>
          <Route path={AppRoute.Offer} element={<OfferPage/>}/>
          <Route path={AppRoute.NotFound} element={<NotFoundPage/>}/>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
