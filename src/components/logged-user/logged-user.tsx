import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../services/api-actions';

function LoggedUser(): JSX.Element {
  const userEmail = useAppSelector((state) => state.userEmail);
  const dispatch = useAppDispatch();

  function onClickHandler() {
    dispatch(logoutAction());
  }

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <a
          className="header__nav-link header__nav-link--profile"
          href="#"
        >
          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
          <span className="header__user-name user__name">
            {userEmail}
          </span>
          <span className="header__favorite-count">3</span>
        </a>
      </li>
      <li className="header__nav-item">
        <a className="header__nav-link" onClick={onClickHandler}>
          <span className="header__signout">Sign out</span>
        </a>
      </li>
    </ul>
  );
}

export default LoggedUser;
