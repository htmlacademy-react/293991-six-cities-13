import {BrowserRouter, Routes, Route} from 'react-router-dom';
import FavoritiesPage from '../../pages/favorities-page/favorities-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  offersCount: number;
}

function App({offersCount}: AppProps): JSX.Element {
  function convertToPrivate (element: JSX.Element): JSX.Element {
    const userAuthorized = false;
    
    return (
      <PrivateRoute userAuthorized={userAuthorized}>
        {element}
      </PrivateRoute>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<MainPage offersCount={offersCount}/>}/>
          <Route path="login" element={<LoginPage/>}/>
          <Route path="favorites" element={convertToPrivate(<FavoritiesPage/>)}/>
          <Route path="offer/:id" element={<OfferPage/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
