import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function LogginButton():JSX.Element {

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item">
        <Link to={AppRoute.Login} className="header__nav-link--profile">
          <span className="header__login">Sign in</span>
        </Link>
      </li>
    </ul>
  );
}

export default LogginButton;
