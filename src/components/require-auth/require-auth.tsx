import { Navigate, Outlet } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { Helmet } from 'react-helmet-async';
import PageHeader from '../page-header/page-header';

function RequireAuth(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  return (
      authorizationStatus === AuthorizationStatus.Unknown ?
      <div className="page">
        <Helmet>
          <title>6 cities</title>
        </Helmet>
        <PageHeader/>
      </div> :
      (authorizationStatus === AuthorizationStatus.Auth ? <Outlet/> : <Navigate to={AppRoute.Login}/>)
  )
}

export default RequireAuth;
