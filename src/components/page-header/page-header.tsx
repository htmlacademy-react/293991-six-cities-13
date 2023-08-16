import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import LoggedUser from '../logged-user/logged-user';
import LogginButton from '../loggin-button/loggin-button';
import { Link } from 'react-router-dom';

function PageHeader(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Root} className="header__logo-link header__logo-link--active">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </Link>
          </div>
          <nav className="header__nav">
            {
              (authorizationStatus !== AuthorizationStatus.Unknown) && (authorizationStatus === AuthorizationStatus.Auth ? <LoggedUser/> : <LogginButton/>)
            }
          </nav>
        </div>
      </div>
    </header>
  );
}

export default PageHeader;
