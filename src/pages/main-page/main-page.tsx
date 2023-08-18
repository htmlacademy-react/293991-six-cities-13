import { Helmet } from 'react-helmet-async';
import Map from '../../components/map/map';
import { AuthorizationStatus, OfferCardMode } from '../../const';
import { CITIES } from '../../const';
import CitiesTabList from '../../components/cities-tab-list/cities-tab-list';
import { useAppSelector } from '../../hooks';
import OffersList from '../../components/offers-list/offers-list';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import { memo } from 'react';
import PageHeader from '../../components/page-header/page-header';
import cn from 'classnames';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getActiveCity, getAreOffersLoading, getOffersByCity } from '../../store/offers-process/selectors';

function MainPage (): JSX.Element {
  const areOffersLoading = useAppSelector(getAreOffersLoading);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const activeCity = useAppSelector(getActiveCity);
  const offersByCity = useAppSelector(getOffersByCity);

  function getElement() {
    // Решение замечания линтера: no-nested-ternary
    return (
      (offersByCity.length === 0) ?
        <>
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property available at the moment in {activeCity.name}</p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </> :
        <>
          <section className="cities__places places">
            <OffersList/>
          </section>
          <div className="cities__right-section">
            <Map mode={OfferCardMode.MainPage}/>
          </div>
        </>
    );
  }

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Welcom to 6 cities!</title>
      </Helmet>
      <PageHeader/>
      <main className={cn(
        'page__main page__main--index',
        {'page__main--index-empty': offersByCity.length === 0},
      )}
      >
        <CitiesTabList cities={CITIES}/>
        <div className="cities">
          <div className={cn(
            'cities__places-container container',
            {'cities__places-container--empty': offersByCity.length === 0},
          )}
          >
            {
              (authorizationStatus === AuthorizationStatus.Unknown || areOffersLoading) ?
                <LoadingSpinner/> :
                getElement()
            }
          </div>
        </div>
      </main>
    </div>
  );
}
export default memo(MainPage);
