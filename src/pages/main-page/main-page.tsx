import { Helmet } from 'react-helmet-async';
import { OfferShort } from '../../types/offer';
import Map from '../../components/map/map';
import { useState } from 'react';
import { OfferCardMode } from '../../const';
import { CITIES } from '../../const';
import CitiesTabList from '../../components/cities-tab-list/cities-tab-list';
import { useAppSelector } from '../../hooks';
import { getOffersByCity } from '../../utils/utils';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import OffersList from '../../components/offers-list/offers-list';

function MainPage (): JSX.Element {
  const allOffersShort = useAppSelector((state) => state.offers);
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);
  const activeCity = useAppSelector((state) => state.activeCity);
  const offersShort = getOffersByCity<OfferShort>(allOffersShort, activeCity.name);

  const [currentOfferId, setCurrentOfferId] = useState<string>();

  const onMouseEnterHandler = (offerId: string) => () => setCurrentOfferId(offerId);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Welcom to 6 cities!</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <CitiesTabList cities={CITIES}/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              {isOffersLoading ? <LoadingSpinner/> : <OffersList offersShort={offersShort} activeCity={activeCity} onMouseEnterHandler={onMouseEnterHandler}/>}
            </section>
            <div className="cities__right-section">
              <Map mode={OfferCardMode.MainPage} offersShort={offersShort} currentOfferId={currentOfferId}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default MainPage;
