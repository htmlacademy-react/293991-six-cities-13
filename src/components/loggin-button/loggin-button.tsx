import { Link } from "react-router-dom";
import { AppRoute } from "../../const";

function LogginButton():JSX.Element {

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item">
        <Link to={AppRoute.Login} className="header__nav-link">
            <span className="header__signout">Sign in</span>
        </Link>
      </li>
    </ul>
  );  
}

export default LogginButton;
