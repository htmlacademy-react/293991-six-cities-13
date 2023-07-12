import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  userAuthorized: boolean;
  children: JSX.Element;
}

function PrivateRoute({userAuthorized, children}: PrivateRouteProps): JSX.Element {
  return userAuthorized ? children : <Navigate to="/login"/>;
}

export default PrivateRoute;
