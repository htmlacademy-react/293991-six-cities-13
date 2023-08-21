import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, FormControlToDisplayError } from '../../const';
import { ChangeEvent, useState, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../services/api-actions';
import { AuthRequestData } from '../../types/auth-data';
import { extractErrorMessageForControl, getRandomCity } from '../../utils/utils';
import styles from './login-page.module.css';
import { City } from '../../types/city';
import { getErrorResponse } from '../../store/response-error-process/selectors';
import { changeCity } from '../../store/offers-process/offers-process';


function LoginPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const errorResponse = useAppSelector(getErrorResponse);
  const [randomCity, _] = useState<City>(getRandomCity());
  const navigate = useNavigate();

  function handleEmailChange(evt: ChangeEvent<HTMLInputElement>) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt: ChangeEvent<HTMLInputElement>) {
    setPassword(evt.target.value);
  }

  function handleFormSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const form = evt.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData) as AuthRequestData;
    dispatch(loginAction(data));

    navigate(AppRoute.Root);
  }

  const errorForEmail = extractErrorMessageForControl(errorResponse, FormControlToDisplayError.EmailControl);
  const errorForPassword = extractErrorMessageForControl(errorResponse, FormControlToDisplayError.PasswordControl);

  function handleCityClick() {
    dispatch(changeCity(randomCity));
  }

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
            <form className="login__form form" onSubmit={handleFormSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                {
                  errorResponse !== null && errorForEmail && <p className={styles.error}>{errorForEmail}</p>
                }
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                {
                  errorResponse !== null && errorForPassword && <p className={styles.error}>{errorForPassword}</p>
                }
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to={AppRoute.Root} className="locations__item-link" onClick={handleCityClick}>
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
