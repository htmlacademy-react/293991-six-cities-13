import { Link, generatePath } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoritesCountAction, logoutAction } from '../../services/api-actions';
import { getUserEmail } from '../../store/user-process/selectors';
import { getFavoritesCount } from '../../store/favorite-process/selectors';
import { useEffect } from 'react';
import { getToken } from '../../services/token';
import { eraseFavoritesCount } from '../../store/favorite-process/favorite-process';

function LoggedUser(): JSX.Element {
  const userEmail = useAppSelector(getUserEmail);
  const favoritesCount = useAppSelector(getFavoritesCount);
  const dispatch = useAppDispatch();
  const token = getToken();

  useEffect(() => {
    if (token) {
      dispatch(fetchFavoritesCountAction());
    }

    return () => {
      dispatch(eraseFavoritesCount());
    };
  }, [dispatch, token]);

  function handleLogoutClick() {
    dispatch(logoutAction());
  }

  return (
    <ul className="header__nav-list">
      {
        favoritesCount !== null &&
        <>
          <li className="header__nav-item user">
            <Link to={generatePath(AppRoute.Favorites)}
              className="header__nav-link header__nav-link--profile"
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__user-name user__name">
                {userEmail}
              </span>
              <span className="header__favorite-count">{favoritesCount}</span>
            </Link>
          </li>
          <li className="header__nav-item">
            <a className="header__nav-link" onClick={handleLogoutClick}>
              <span className="header__signout">Sign out</span>
            </a>
          </li>
        </>
      }
    </ul>
  );
}

export default LoggedUser;
