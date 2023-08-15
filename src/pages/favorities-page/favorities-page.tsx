import { Helmet } from 'react-helmet-async';
import PageHeader from '../../components/page-header/page-header';
import { OfferShort } from '../../types/offer';
import FavoritiesList from '../../components/favorities-list/favorities-list';
import { groupOffersByCity } from '../../utils/utils';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function FavoritiesPage(): JSX.Element {
  const offersFavorities: OfferShort[] = [];
  const offersByCities = groupOffersByCity<OfferShort>(offersFavorities);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Favorites</title>
      </Helmet>
      <PageHeader/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.keys(offersByCities).map((city: string) => <FavoritiesList key={city} city={city} offers={offersByCities[city]}/>)}
            </ul>
          </section>
        </div>
      </main>
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
