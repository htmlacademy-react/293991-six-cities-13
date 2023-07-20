import { Helmet } from 'react-helmet-async';
import { TOfferDetail } from '../../types/offer';
import { Navigate, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import ImagesList from '../../components/offer-images-list/offer-images-list';
import OfferGoodsList from '../../components/offer-goods-list/offer-goods-list';
import OfferHost from '../../components/offer-host/offer-host';
import OfferFeatures from '../../components/offer-features/offer-features';
import OfferPrice from '../../components/offer-price/offer-price';
import OfferRating from '../../components/offer-rating/offer-rating';
import OfferHeader from '../../components/offer-header/offer-header';
import PageHeader from '../../components/page-header/page-header';
import OfferReview from '../../components/offer-review/offer-review';
import NearPlaces from '../../components/near-places/near-places';
import TOfferMap from '../../components/offer-map/offer-map';
import { TReview } from '../../types/offer-review';

type OfferPageProps = {
  offersDetail: TOfferDetail[];
  reviews: TReview[];
}

function OfferPage({offersDetail, reviews}: OfferPageProps): JSX.Element {
  const { id } = useParams();
  const offerDetail = offersDetail.find((offer: TOfferDetail) => offer.id === id) as TOfferDetail;
  if (offerDetail === undefined) {
    <Navigate to={AppRoute.NotFound}/>;
  }

  const review = reviews.find((rv: TReview) => rv.offerId === id) as TReview;

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
              <OfferReview comments={review.comments}/>
            </div>
          </div>
          <TOfferMap/>
        </section>
        <NearPlaces/>
      </main>
    </div>
  );
}

export default OfferPage;
