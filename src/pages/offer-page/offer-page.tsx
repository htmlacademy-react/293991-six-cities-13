import { Helmet } from 'react-helmet-async';
import { OfferDetail, OfferShort } from '../../types/offer';
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
import { Review } from '../../types/offer-review';
import { getNearOffers } from '../../utils/utils';
import OfferCard from '../../components/offer-card/offer-card';
import Map from '../../components/map/map';
import { changeCurrentOffer } from '../../store/action';
import { useAppDispatch } from '../../hooks';

function OfferPage(): JSX.Element {
  const offersDetail: OfferDetail[] = [];
  const reviews: Review[] = [];
  const { id } = useParams();
  const offerDetail = offersDetail.find((offer: OfferDetail) => offer.id === id) as OfferDetail;
  const dispatch = useAppDispatch();

  if (offerDetail === undefined) {
    <Navigate to={AppRoute.NotFound}/>;
  }

  const review = reviews.find((rv: Review) => rv.offerId === id) as Review;
  const nearOffers = getNearOffers();
  const onMouseEnterHandler = (offerId: string) => () => dispatch(changeCurrentOffer(offerId));

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Offer</title>
      </Helmet>
      <PageHeader/>
      <main className="page__main page__main--offer">
        <section className="offer">
          <ImagesList offerDetail={offerDetail}/>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <OfferHeader offerDetail={offerDetail}/>
              <OfferRating offerDetail={offerDetail}/>
              <OfferFeatures offerDetail={offerDetail}/>
              <OfferPrice offerDetail={offerDetail}/>
              <OfferGoodsList offerDetail={offerDetail}/>
              <OfferHost offerDetail={offerDetail}/>
              {/*Формальный PR. Компонент добавлен в предыдущий коммитах. Пункт 2.*/}
              <OfferReview comments={review.comments}/>
            </div>
          </div>
          {/*Формальный PR. Компонент добавлен в предыдущий коммитах. Пункт 3.*/}
          <Map mode={OfferCardMode.NearPlaces} offersShort={nearOffers}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {/*Формальный PR. Компонент добавлен в предыдущий коммитах. Пункт 4.*/}
              {nearOffers.map((offerShort: OfferShort) => (<OfferCard key={offerShort.id} offerShort={offerShort} mode={OfferCardMode.NearPlaces} onMouseEnterHandler={onMouseEnterHandler(offerShort.id)}/>))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
