import { Helmet } from 'react-helmet-async';
import { OfferShort } from '../../types/offer';
import { useParams } from 'react-router-dom';
import { OfferCardMode } from '../../const';
import ImagesList from '../../components/offer-images-list/offer-images-list';
import OfferGoodsList from '../../components/offer-goods-list/offer-goods-list';
import OfferHost from '../../components/offer-host/offer-host';
import OfferFeatures from '../../components/offer-features/offer-features';
import OfferPrice from '../../components/offer-price/offer-price';
import OfferRating from '../../components/offer-rating/offer-rating';
import OfferHeader from '../../components/offer-header/offer-header';
import PageHeader from '../../components/page-header/page-header';
import OfferReview from '../../components/offer-review/offer-review';
import OfferCard from '../../components/offer-card/offer-card';
import Map from '../../components/map/map';
import { deleteOfferDetail } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import { loadOfferDetailAction } from '../../services/api-actions';
import { useEffect } from 'react';
import { filterNearByOffers } from '../../utils/utils';
import NotFoundPage from '../not-found-page/not-found-page';

function OfferPage(): JSX.Element {
  const isOfferDetailLoading = useAppSelector((state) => state.isOfferDetailLoading);
  const offersNearBy = useAppSelector((state) => state.offersNearBy);
  const filteredOffersNearBy = filterNearByOffers(offersNearBy);
  const offerComments = useAppSelector((state) => state.offerComments);
  const offerDetail = useAppSelector((state) => state.offerDetail);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(loadOfferDetailAction(id));
    }
    return () => {
      dispatch(deleteOfferDetail());
    };
  }, [id, dispatch]);

  if ((offerDetail === undefined || offerDetail === null) && !isOfferDetailLoading) {
    return <NotFoundPage/>
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Offer</title>
      </Helmet>
      <PageHeader/>
      <main className="page__main page__main--offer">
        {
          isOfferDetailLoading ?
            <LoadingSpinner/> :
            <>
              <section className="offer">
                <ImagesList images={offerDetail?.images}/>
                <div className="offer__container container">
                  <div className="offer__wrapper">
                    <OfferHeader offerDetail={offerDetail}/>
                    <OfferRating rating={offerDetail?.rating}/>
                    <OfferFeatures type={offerDetail?.type} bedrooms={offerDetail?.bedrooms} maxAdults={offerDetail?.maxAdults}/>
                    <OfferPrice price={offerDetail?.price}/>
                    <OfferGoodsList goods={offerDetail?.goods}/>
                    <OfferHost description={offerDetail?.description} host={offerDetail?.host}/>
                    <OfferReview comments={offerComments}/>
                  </div>
                </div>
                <Map mode={OfferCardMode.NearPlaces} currentOfferId={offerDetail?.id}/>
              </section>
              <div className="container">
                <section className="near-places places">
                  <h2 className="near-places__title">
                    Other places in the neighbourhood
                  </h2>
                  <div className="near-places__list places__list">
                    {filteredOffersNearBy.map((offerShort: OfferShort) => (<OfferCard key={offerShort.id} offerShort={offerShort} mode={OfferCardMode.NearPlaces}/>))}
                  </div>
                </section>
              </div>
            </>
        }
      </main>
    </div>
  );
}

export default OfferPage;
