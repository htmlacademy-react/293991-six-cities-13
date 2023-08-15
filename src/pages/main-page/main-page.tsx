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
import cn from 'classnames';

function MainPage (): JSX.Element {
  const isOffersLoading = useAppSelector((state) => state.areOffersLoading);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const allOffersShort = useAppSelector((state) => state.offers);
  const activeCity = useAppSelector((state) => state.activeCity);
  const offersShort = getOffersByCity<OfferShort>(allOffersShort, activeCity.name);
  const [currentOfferId, setCurrentOfferId] = useState<string>('');

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Welcom to 6 cities!</title>
      </Helmet>
      <PageHeader/>
      <main className={cn(
        'page__main page__main--index',
        {'page__main--index-empty': offersShort.length === 0},
      )}>
        <CitiesTabList cities={CITIES}/>
        <div className="cities">
          <div className={cn(
            'cities__places-container container',
            {'cities__places-container--empty': offersShort.length === 0},
          )}>
            {
              (authorizationStatus === AuthorizationStatus.Unknown || isOffersLoading) ?
                <LoadingSpinner/> :
                (offersShort.length === 0) ?
                  <>
                    <section className="cities__no-places">
                      <div className="cities__status-wrapper tabs__content">
                        <b className="cities__status">No places to stay available</b>
                        <p className="cities__status-description">We could not find any property available at the moment in {activeCity.name}</p>
                      </div>
                    </section>
                    <div className="cities__right-section"></div> 
                  </>:
                  <>
                    <section className="cities__places places">
                      <OffersList
                        offersShort={offersShort}
                        activeCity={activeCity}
                        onMouseEnterHandler={(offerId: string) => () => setCurrentOfferId(offerId)}
                        onMouseLeaveHandler={() => setCurrentOfferId('')}
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
