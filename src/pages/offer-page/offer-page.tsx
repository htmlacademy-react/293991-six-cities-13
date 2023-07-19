import { Helmet } from 'react-helmet-async';
import { OfferDetail } from '../../types/offer';
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
import OfferMap from '../../components/offer-map/offer-map';
import { Review } from '../../types/offer-review';

type OfferPageProps = {
  offersDetail: OfferDetail[];
  reviews: Review[];
}

function OfferPage({offersDetail, reviews}: OfferPageProps): JSX.Element {
  const { id } = useParams();
  const offerDetail = offersDetail.find((offer: OfferDetail) => offer.id === id) as OfferDetail
  if (offerDetail === undefined) {
    <Navigate to={AppRoute.NotFound}/>
  }

  const review = reviews.find((review: Review) => review.offerId === id) as Review

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
              {review && <OfferReview comments={review.comments}/>}
            </div>
          </div>
          <OfferMap/>
        </section>
        <NearPlaces/>
      </main>
    </div>
  );
}

export default OfferPage;
