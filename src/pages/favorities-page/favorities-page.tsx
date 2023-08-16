import { Helmet } from 'react-helmet-async';
import PageHeader from '../../components/page-header/page-header';
import { OfferShort } from '../../types/offer';
import FavoritiesList from '../../components/favorities-list/favorities-list';
import { groupOffersByCityName } from '../../utils/utils';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { loadFavoritesAction } from '../../services/api-actions';
import { changeFavoritesLoadingStatus, deleteFavorites } from '../../store/action';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';

function FavoritiesPage(): JSX.Element {
  const favorites = useAppSelector((state) => state.favorites);
  const areFavoritesLoading = useAppSelector((state) => state.areFavoritesLoading);
  const dispatch = useAppDispatch();
  const groupedOffersByCityName = groupOffersByCityName<OfferShort>(favorites);

  useEffect(() => {
    dispatch(loadFavoritesAction());
    dispatch(changeFavoritesLoadingStatus(true));

    return () => {
      dispatch(deleteFavorites());
    };
  }, [dispatch]);

  function getElement() {
    // Решение замечания линтера: no-nested-ternary
    return (
      favorites.length > 0 ?
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.keys(groupedOffersByCityName).map((cityName: string) => <FavoritiesList key={cityName} offers={groupedOffersByCityName[cityName]}/>)}
              </ul>
            </section>
          </div>
        </main> :
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            </section>
          </div>
        </main>
    );
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Favorites</title>
      </Helmet>
      <PageHeader/>
      {
        areFavoritesLoading ?
          <LoadingSpinner/> :
          getElement()
      }
      <footer className="footer container">
        <Link to={AppRoute.Root} className="header__logo-link">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritiesPage;
