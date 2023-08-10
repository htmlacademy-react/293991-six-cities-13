import { Helmet } from 'react-helmet-async';
import { OfferShort } from '../../types/offer';
import Map from '../../components/map/map';
import { AuthorizationStatus, OfferCardMode } from '../../const';
import { CITIES } from '../../const';
import CitiesTabList from '../../components/cities-tab-list/cities-tab-list';
import { useAppSelector } from '../../hooks';
import { getOffersByCity } from '../../utils/utils';
import OffersList from '../../components/offers-list/offers-list';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import { useState } from 'react';
import PageHeader from '../../components/page-header/page-header';

function MainPage (): JSX.Element {
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const allOffersShort = useAppSelector((state) => state.offers);
  const activeCity = useAppSelector((state) => state.activeCity);
  const offersShort = getOffersByCity<OfferShort>(allOffersShort, activeCity.name);
  const [currentOfferId, setCurrentOfferId] = useState<string>('');

  const onMouseEnterHandler = (offerId: string) => () => setCurrentOfferId(offerId);
  const onMouseLeaveHandler = () => setCurrentOfferId('');

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Welcom to 6 cities!</title>
      </Helmet>
      <PageHeader/>
      <main className="page__main page__main--index">
        <CitiesTabList cities={CITIES}/>
        <div className="cities">
          <div className="cities__places-container container">
            {
              (authorizationStatus === AuthorizationStatus.Unknown || isOffersLoading) ?
                <LoadingSpinner/> :
                <>
                  <section className="cities__places places">
                    <OffersList
                      offersShort={offersShort}
                      activeCity={activeCity}
                      onMouseEnterHandler={onMouseEnterHandler}
                      onMouseLeaveHandler={onMouseLeaveHandler}
                    />
                  </section>
                  <div className="cities__right-section">
                    <Map offersShort={offersShort} mode={OfferCardMode.MainPage} currentOfferId={currentOfferId}/>
                  </div>
                </>
            }
          </div>
        </div>
      </main>
    </div>
  );
}
export default MainPage;
