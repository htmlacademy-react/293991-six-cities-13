import { memo } from 'react';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import LoggedUser from '../logged-user/logged-user';
import LogginButton from '../loggin-button/loggin-button';
import { Link } from 'react-router-dom';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import cn from 'classnames';

type PageHeaderProps = {
  isFavoritesEmptyPage?: boolean;
}

function _PageHeader({isFavoritesEmptyPage = false}: PageHeaderProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <header className={cn(
      'header',
      {'page--favorites-empty': isFavoritesEmptyPage}
    )}
    >
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
              authorizationStatus === AuthorizationStatus.Auth ? <LoggedUser/> : <LogginButton/>
            }
          </nav>
        </div>
      </div>
    </header>
  );
}

const PageHeader = memo(_PageHeader);
export default PageHeader;
