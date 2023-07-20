import { Helmet } from 'react-helmet-async';
import PageHeader from '../../components/page-header/page-header';
import { TOfferShort } from '../../types/offer';
import FavoritiesList from '../../components/favorities-list/favorities-list';

type FavoritiesPageProps = {
  offersFavorities: TOfferShort[];
}

function FavoritiesPage({offersFavorities}: FavoritiesPageProps): JSX.Element {
  const cities = Array.from(new Set(offersFavorities.map((offer: TOfferShort) => offer.city.name)));

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Favorities</title>
      </Helmet>
      <PageHeader/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {cities.map((city: string) => <FavoritiesList key={city} city={city} offersFavorities={offersFavorities}/>)}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </a>
      </footer>
    </div>
  );
}

export default FavoritiesPage;
