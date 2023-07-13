import {BrowserRouter, Routes, Route} from 'react-router-dom';
import FavoritiesPage from '../../pages/favorities-page/favorities-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import {AppRoute, AuthorizationStatus} from '../../const';

type AppProps = {
  offersCount: number;
}

function App({offersCount}: AppProps): JSX.Element {
  function convertToPrivate (element: JSX.Element): JSX.Element {
    return (
      <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
        {element}
      </PrivateRoute>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<MainPage offersCount={offersCount}/>}/>
          <Route path={AppRoute.Login} element={<LoginPage/>}/>
          <Route path={AppRoute.Favorites} element={convertToPrivate(<FavoritiesPage/>)}/>
          <Route path={AppRoute.Offer} element={<OfferPage/>}/>
          <Route path={AppRoute.NotFound} element={<NotFoundPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
