import { Helmet } from 'react-helmet-async';
import { OfferShort } from '../../types/offer';
import { Navigate, useParams } from 'react-router-dom';
import { AppRoute, OfferCardMode } from '../../const';
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
import { deleteOfferComments, deleteOfferDetail, deleteOffersNearBy } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import { loadOfferCommentsAction, loadOfferDetailAction, loadOffersNearByAction } from '../../services/api-actions';
import { useEffect } from 'react';
import { filterNearByOffers } from '../../utils/utils';

function OfferPage(): JSX.Element {
  const isOfferDetailLoading = useAppSelector((state) => state.isOfferDetailLoading);
  const areOfferCommentsLoading = useAppSelector((state) => state.areOfferCommentsLoading);
  const offersNearBy = useAppSelector((state) => state.offersNearBy);
  const filteredOffersNearBy = filterNearByOffers(offersNearBy);
  const areOffersNearByLoading = useAppSelector((state) => state.areOffersNearByLoading);
  const offerComments = useAppSelector((state) => state.offerComments);
  const offerDetail = useAppSelector((state) => state.offerDetail);
  const offersShort = useAppSelector((state) => state.offers);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  if (offerDetail === undefined || offerDetail === null) {
    <Navigate to={AppRoute.NotFound}/>;
  }
  const currentOfferShort = offersShort.find((offer: OfferShort) => offer.id === offerDetail?.id);
  const offersForMap = currentOfferShort !== undefined ? [...filteredOffersNearBy, currentOfferShort] : filteredOffersNearBy;

  useEffect(() => {
    if (id) {
      dispatch(loadOfferDetailAction(id));
      dispatch(loadOfferCommentsAction(id));
      dispatch(loadOffersNearByAction(id));
    }
    return () => {
      dispatch(deleteOfferDetail());
      dispatch(deleteOfferComments());
      dispatch(deleteOffersNearBy());
    };
  }, [id, dispatch]);

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
                    {
                      areOfferCommentsLoading ?
                        <LoadingSpinner/> :
                        <OfferReview comments={offerComments}/>
                    }
                  </div>
                </div>
                {
                  areOffersNearByLoading ?
                    <LoadingSpinner/> :
                    <Map mode={OfferCardMode.NearPlaces} currentOfferId={offerDetail?.id}/>
                }
              </section>
              {
                areOffersNearByLoading ?
                  <LoadingSpinner/> :
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
              }
            </>
        }
      </main>
    </div>
  );
}

export default OfferPage;
