import { MAX_IMAGES_IN_OFFER_CARD } from '../../const';
import OfferImage from '../offer-image/offer-image';

type ImageListProps = {
  images: string[] | undefined;
}

function ImagesList({images = []}: ImageListProps):JSX.Element {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.slice(0, MAX_IMAGES_IN_OFFER_CARD).map((imageSrc: string) => (<OfferImage key={imageSrc} imageSrc={imageSrc}/>))}
      </div>
    </div>
  );
}

export default ImagesList;
