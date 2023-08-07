import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { ChangeEvent, useState, MouseEvent} from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../services/api-actions';

function LoginPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  
  function onChangeEmailHandler(evt: ChangeEvent<HTMLInputElement>) {
    setEmail(evt.target.value);
  }

  function onChangePasswordHandler(evt: ChangeEvent<HTMLInputElement>) {
    setPassword(evt.target.value);
  }

  function onClickHandler(evt: MouseEvent<HTMLElement>) {
    evt.preventDefault();
    dispatch(loginAction({email, password}));
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities. Login</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Root} className="header__logo-link">
                  <img
                    className="header__logo"
                    src="img/logo.svg"
                    alt="6 cities logo"
                    width={81}
                    height={41}
                  />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={onChangeEmailHandler}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={onChangePasswordHandler}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                onClick={onClickHandler}
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
